var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var OvercomeProcrastinationComment    = require("../../app/models/blog/overcomeProcrastinationComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    OvercomeProcrastinationComment.find({}, function(err, allOvercomeProcrastinationComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/howToOvercomeProcrastination/index", {overcomeProcrastinationComment: allOvercomeProcrastinationComment});
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
    var newOvercomeProcrastinationComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    OvercomeProcrastinationComment.create(newOvercomeProcrastinationComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/howToOvercomeProcrastination");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/howToOvercomeProcrastination/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    OvercomeProcrastinationComment.findById(req.params.id).populate("comments").exec(function(err, foundOvercomeProcrastinationComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/howToOvercomeProcrastination/show", {overcomeProcrastinationComment: foundOvercomeProcrastinationComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkOvercomeProcrastinationCommentOwnership, function(req, res){
    OvercomeProcrastinationComment.findById(req.params.id, function(err, foundOvercomeProcrastinationComment){
        if(err){
            res.redirect("/blog/posts/howToOvercomeProcrastination");
        } else {
            res.render("blog/posts/howToOvercomeProcrastination/edit", {overcomeProcrastinationComment: foundOvercomeProcrastinationComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkOvercomeProcrastinationCommentOwnership, function(req, res){
    // Find and update the correct comment
    OvercomeProcrastinationComment.findByIdAndUpdate(req.params.id, req.body.overcomeProcrastinationComment, function(err, updatedOvercomeProcrastinationComment){
        if(err){
            res.redirect("/blog/posts/howToOvercomeProcrastination");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/howToOvercomeProcrastination/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkOvercomeProcrastinationCommentOwnership, function(req, res){
    OvercomeProcrastinationComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/howToOvercomeProcrastination");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/howToOvercomeProcrastination");
        }
    });
});    

module.exports = router;