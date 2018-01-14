var express        = require("express");
var router         = express.Router({mergeParams: true});
var Study         = require("../../app/models/uniTalk/study");
var timestamp      = require('time-stamp');
var Comment        = require("../../app/models/uniTalk/studyComment");
var middleware     = require("../../middleware"),
uniTalkMiddleware  = require("../../middleware/uniTalk");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    Study.findById(req.params.id, function(err, Study){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/study/comments/new", {study: Study});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup topic using id
    Study.findById(req.params.id, function(err, study){
        if(err){
            console.log(err);
            res.redirect("/uniTalk/study");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                } else {
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.text = req.body.body;
                    comment.author.username =  req.user.local.username || req.user.facebook.name || req.user.twitter.username || req.user.google.name;
                   
                    // Save comment
                    comment.save();
                    study.comments.push(comment);
                    study.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect('/uniTalk/study/' + study._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", uniTalkMiddleware.checkStudyCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("uniTalk/study/comments/edit", {study_id: req.params.id, comment: foundComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", uniTalkMiddleware.checkStudyCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/uniTalk/study/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", uniTalkMiddleware.checkStudyCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/uniTalk/study/" + req.params.id);
        }
    });
});

module.exports = router;