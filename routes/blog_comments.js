var express    = require("express");
var router     = express.Router({mergeParams: true});
/*var Topic      = require("./app/models/topic");*/
var Comment    = require("./app/models/comment");
var middleware = require("../middleware");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
            res.render("comments/new");
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    /*req.flash("error", "Something went wrong");*/
                    console.log(err);
                } else {
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save comment
                    comment.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect("back");
                }
            });
        
});

// Comments EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("comments/edit", {comment: foundComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("back"); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("back");
        }
    });
});


module.exports = router;