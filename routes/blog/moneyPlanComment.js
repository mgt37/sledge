var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var MoneyPlanComment    = require("../../app/models/blog/moneyPlanComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    MoneyPlanComment.find({}, function(err, allMoneyPlanComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/moneyPlan/index", {moneyPlanComment: allMoneyPlanComment});
        }
    });
});

//CREATE - add new comment to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to comments array
    var blogComment   = req.body.blogComment;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newMoneyPlanComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    MoneyPlanComment.create(newMoneyPlanComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/moneyPlan");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/moneyPlan/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    MoneyPlanComment.findById(req.params.id).populate("comments").exec(function(err, foundMoneyPlanComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/moneyPlan/show", {moneyPlanComment: foundMoneyPlanComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkMoneyPlanCommentOwnership, function(req, res){
    MoneyPlanComment.findById(req.params.id, function(err, foundMoneyPlanComment){
        if(err){
            res.redirect("/blog/posts/moneyPlan");
        } else {
            res.render("blog/posts/moneyPlan/edit", {moneyPlanComment: foundMoneyPlanComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkMoneyPlanCommentOwnership, function(req, res){
    // Find and update the correct comment
    MoneyPlanComment.findByIdAndUpdate(req.params.id, req.body.moneyPlanComment, function(err, updatedMoneyPlanComment){
        if(err){
            res.redirect("/blog/posts/moneyPlan");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/moneyPlan/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkMoneyPlanCommentOwnership, function(req, res){
    MoneyPlanComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/moneyPlan");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/moneyPlan");
        }
    });
});    

module.exports = router;