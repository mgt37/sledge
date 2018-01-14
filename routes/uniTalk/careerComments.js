var express        = require("express");
var router         = express.Router({mergeParams: true});
var Career         = require("../../app/models/uniTalk/career");
var timestamp      = require('time-stamp');
var time           = timestamp('YYYY/MM/DD HH:mm:ss');
var Comment        = require("../../app/models/uniTalk/careerComment");
var middleware     = require("../../middleware"),
uniTalkMiddleware  = require("../../middleware/uniTalk");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    Career.findById(req.params.id, function(err, Career, then){
        if(err){
            console.log(err);
        } else {
            var now = new Date();
            var jsonDate = now.toJSON();
            then = new Date(jsonDate);
            res.render("uniTalk/career/comments/new", {career: Career, then: then});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup topic using id
    Career.findById(req.params.id, function(err, career){
        if(err){
            console.log(err);
            res.redirect("/uniTalk/career");
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
                    career.comments.push(comment);
                    career.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect('/uniTalk/career/' + career._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", uniTalkMiddleware.checkCareerCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment, then){
        if(err){
            res.redirect("back");
        } else {
           res.render("uniTalk/career/comments/edit", {career_id: req.params.id, comment: foundComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", uniTalkMiddleware.checkCareerCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/uniTalk/career/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", uniTalkMiddleware.checkCareerCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/uniTalk/career/" + req.params.id);
        }
    });
});

module.exports = router;