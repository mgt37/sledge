var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var FunOutsideOfStudyComment    = require("../../app/models/blog/funOutsideOfStudyComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    FunOutsideOfStudyComment.find({}, function(err, allFunOutsideOfStudyComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/waysToHaveFunOutsideOfStudy/index", {funOutsideOfStudyComment: allFunOutsideOfStudyComment});
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
    var newFunOutsideOfStudyComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    FunOutsideOfStudyComment.create(newFunOutsideOfStudyComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/waysToHaveFunOutsideOfStudy");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/waysToHaveFunOutsideOfStudy/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    FunOutsideOfStudyComment.findById(req.params.id).populate("comments").exec(function(err, foundFunOutsideOfStudyComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/waysToHaveFunOutsideOfStudy/show", {funOutsideOfStudyComment: foundFunOutsideOfStudyComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkFunOutsideOfStudyCommentOwnership, function(req, res){
    FunOutsideOfStudyComment.findById(req.params.id, function(err, foundFunOutsideOfStudyComment){
        if(err){
            res.redirect("/blog/posts/waysToHaveFunOutsideOfStudy");
        } else {
            res.render("blog/posts/waysToHaveFunOutsideOfStudy/edit", {funOutsideOfStudyComment: foundFunOutsideOfStudyComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkFunOutsideOfStudyCommentOwnership, function(req, res){
    // Find and update the correct comment
    FunOutsideOfStudyComment.findByIdAndUpdate(req.params.id, req.body.funOutsideOfStudyComment, function(err, updatedFunOutsideOfStudyComment){
        if(err){
            res.redirect("/blog/posts/waysToHaveFunOutsideOfStudy");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/waysToHaveFunOutsideOfStudy/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkFunOutsideOfStudyCommentOwnership, function(req, res){
    FunOutsideOfStudyComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/waysToHaveFunOutsideOfStudy");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/waysToHaveFunOutsideOfStudy");
        }
    });
});    

module.exports = router;