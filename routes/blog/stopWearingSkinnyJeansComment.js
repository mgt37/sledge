var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var StopWearingSkinnyJeansComment    = require("../../app/models/blog/stopWearingSkinnyJeansComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    StopWearingSkinnyJeansComment.find({}, function(err, allStopWearingSkinnyJeansComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/stopWearingSkinnyJeans/index", {stopWearingSkinnyJeansComment: allStopWearingSkinnyJeansComment});
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
    var newStopWearingSkinnyJeansComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    StopWearingSkinnyJeansComment.create(newStopWearingSkinnyJeansComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/stopWearingSkinnyJeans");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/stopWearingSkinnyJeans/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    StopWearingSkinnyJeansComment.findById(req.params.id).populate("comments").exec(function(err, foundStopWearingSkinnyJeansComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/stopWearingSkinnyJeans/show", {stopWearingSkinnyJeansComment: foundStopWearingSkinnyJeansComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkStopWearingSkinnyJeansCommentOwnership, function(req, res){
    StopWearingSkinnyJeansComment.findById(req.params.id, function(err, foundStopWearingSkinnyJeansComment){
        if(err){
            res.redirect("/blog/posts/stopWearingSkinnyJeans");
        } else {
            res.render("blog/posts/stopWearingSkinnyJeans/edit", {stopWearingSkinnyJeansComment: foundStopWearingSkinnyJeansComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkStopWearingSkinnyJeansCommentOwnership, function(req, res){
    // Find and update the correct comment
    StopWearingSkinnyJeansComment.findByIdAndUpdate(req.params.id, req.body.stopWearingSkinnyJeansComment, function(err, updatedStopWearingSkinnyJeansComment){
        if(err){
            res.redirect("/blog/posts/stopWearingSkinnyJeans");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/stopWearingSkinnyJeans/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkStopWearingSkinnyJeansCommentOwnership, function(req, res){
    StopWearingSkinnyJeansComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/stopWearingSkinnyJeans");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/stopWearingSkinnyJeans");
        }
    });
});    

module.exports = router;