var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var BalancePartTimeWorkComment    = require("../../app/models/blog/balancePartTimeWorkComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    BalancePartTimeWorkComment.find({}, function(err, allBalancePartTimeWorkComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/getTheBalanceRightWithPartTimeWork/index", {balancePartTimeWorkComment: allBalancePartTimeWorkComment});
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
    var newBalancePartTimeWorkComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    BalancePartTimeWorkComment.create(newBalancePartTimeWorkComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/getTheBalanceRightWithPartTimeWork");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/getTheBalanceRightWithPartTimeWork/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    BalancePartTimeWorkComment.findById(req.params.id).populate("comments").exec(function(err, foundBalancePartTimeWorkComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/getTheBalanceRightWithPartTimeWork/show", {balancePartTimeWorkComment: foundBalancePartTimeWorkComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkBalancePartTimeWorkCommentOwnership, function(req, res){
    BalancePartTimeWorkComment.findById(req.params.id, function(err, foundBalancePartTimeWorkComment){
        if(err){
            res.redirect("/blog/posts/getTheBalanceRightWithPartTimeWork");
        } else {
            res.render("blog/posts/getTheBalanceRightWithPartTimeWork/edit", {balancePartTimeWorkComment: foundBalancePartTimeWorkComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkBalancePartTimeWorkCommentOwnership, function(req, res){
    // Find and update the correct comment
    BalancePartTimeWorkComment.findByIdAndUpdate(req.params.id, req.body.balancePartTimeWorkComment, function(err, updatedBalancePartTimeWorkComment){
        if(err){
            res.redirect("/blog/posts/getTheBalanceRightWithPartTimeWork");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/getTheBalanceRightWithPartTimeWork/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkBalancePartTimeWorkCommentOwnership, function(req, res){
    BalancePartTimeWorkComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/getTheBalanceRightWithPartTimeWork");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/getTheBalanceRightWithPartTimeWork");
        }
    });
});    

module.exports = router;