var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var CorrectYourHabitsComment    = require("../../app/models/blog/correctYourHabitsComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    CorrectYourHabitsComment.find({}, function(err, allCorrectYourHabitsComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/takeOnTheChallengeToCorrectYourHabits/index", {correctYourHabitsComment: allCorrectYourHabitsComment});
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
    var newCorrectYourHabitsComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    CorrectYourHabitsComment.create(newCorrectYourHabitsComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/takeOnTheChallengeToCorrectYourHabits");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/takeOnTheChallengeToCorrectYourHabits/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    CorrectYourHabitsComment.findById(req.params.id).populate("comments").exec(function(err, foundCorrectYourHabitsComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/takeOnTheChallengeToCorrectYourHabits/show", {correctYourHabitsComment: foundCorrectYourHabitsComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkCorrectYourHabitsCommentOwnership, function(req, res){
    CorrectYourHabitsComment.findById(req.params.id, function(err, foundCorrectYourHabitsComment){
        if(err){
            res.redirect("/blog/posts/takeOnTheChallengeToCorrectYourHabits");
        } else {
            res.render("blog/posts/takeOnTheChallengeToCorrectYourHabits/edit", {correctYourHabitsComment: foundCorrectYourHabitsComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkCorrectYourHabitsCommentOwnership, function(req, res){
    // Find and update the correct comment
    CorrectYourHabitsComment.findByIdAndUpdate(req.params.id, req.body.correctYourHabitsComment, function(err, updatedCorrectYourHabitsComment){
        if(err){
            res.redirect("/blog/posts/takeOnTheChallengeToCorrectYourHabits");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/takeOnTheChallengeToCorrectYourHabits/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkCorrectYourHabitsCommentOwnership, function(req, res){
    CorrectYourHabitsComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/takeOnTheChallengeToCorrectYourHabits");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/takeOnTheChallengeToCorrectYourHabits");
        }
    });
});    

module.exports = router;