var express        = require("express");
var router         = express.Router({mergeParams: true});
var Relationship         = require("../../app/models/uniTalk/relationship");
var timestamp      = require('time-stamp');
var Comment        = require("../../app/models/uniTalk/relationshipComment");
var middleware     = require("../../middleware"),
uniTalkMiddleware  = require("../../middleware/uniTalk");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    Relationship.findById(req.params.id, function(err, Relationship){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/relationship/comments/new", {relationship: Relationship});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup topic using id
    Relationship.findById(req.params.id, function(err, relationship){
        if(err){
            console.log(err);
            res.redirect("/uniTalk/relationship");
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
                    relationship.comments.push(comment);
                    relationship.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect('/uniTalk/relationship/' + relationship._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", uniTalkMiddleware.checkRelationshipCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("uniTalk/relationship/comments/edit", {relationship_id: req.params.id, comment: foundComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", uniTalkMiddleware.checkRelationshipCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/uniTalk/relationship/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", uniTalkMiddleware.checkRelationshipCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/uniTalk/relationship/" + req.params.id);
        }
    });
});

module.exports = router;