var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var SleepEffectivelyComment    = require("../../app/models/blog/sleepEffectivelyComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    SleepEffectivelyComment.find({}, function(err, allSleepEffectivelyComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/howToSleepEffectivelyWhileStudying/index", {sleepEffectivelyComment: allSleepEffectivelyComment});
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
    var newSleepEffectivelyComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    SleepEffectivelyComment.create(newSleepEffectivelyComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/howToSleepEffectivelyWhileStudying");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/howToSleepEffectivelyWhileStudying/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    SleepEffectivelyComment.findById(req.params.id).populate("comments").exec(function(err, foundSleepEffectivelyComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/howToSleepEffectivelyWhileStudying/show", {sleepEffectivelyComment: foundSleepEffectivelyComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkSleepEffectivelyCommentOwnership, function(req, res){
    SleepEffectivelyComment.findById(req.params.id, function(err, foundSleepEffectivelyComment){
        if(err){
            res.redirect("/blog/posts/howToSleepEffectivelyWhileStudying");
        } else {
            res.render("blog/posts/howToSleepEffectivelyWhileStudying/edit", {sleepEffectivelyComment: foundSleepEffectivelyComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkSleepEffectivelyCommentOwnership, function(req, res){
    // Find and update the correct comment
    SleepEffectivelyComment.findByIdAndUpdate(req.params.id, req.body.sleepEffectivelyComment, function(err, updatedSleepEffectivelyComment){
        if(err){
            res.redirect("/blog/posts/howToSleepEffectivelyWhileStudying");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/howToSleepEffectivelyWhileStudying/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkSleepEffectivelyCommentOwnership, function(req, res){
    SleepEffectivelyComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/howToSleepEffectivelyWhileStudying");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/howToSleepEffectivelyWhileStudying");
        }
    });
});    

module.exports = router;