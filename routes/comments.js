var express    = require("express");
var router     = express.Router({mergeParams: true});
var Topic      = require("../models/topic");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    Topic.findById(req.params.id, function(err, topic){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {topic: topic});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup topic using id
    Topic.findById(req.params.id, function(err, topic){
        if(err){
            console.log(err);
            res.redirect("/topics");
        } else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save comment
                    comment.save();
                    topic.comments.push(comment);
                    topic.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect('/topics/' + topic._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("comments/edit", {topic_id: req.params.id, comment: foundComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/topics/" + req.params.id) 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/topics/" + req.params.id);
        }
    });
});


module.exports = router;