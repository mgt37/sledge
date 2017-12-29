var express        = require("express");
var router         = express.Router({mergeParams: true});
var Party         = require("../../app/models/uniTalk/party");
var timestamp      = require('time-stamp');
var Comment        = require("../../app/models/uniTalk/partyComment");
var middleware     = require("../../middleware"),
uniTalkMiddleware  = require("../../middleware/uniTalk");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    Party.findById(req.params.id, function(err, Party){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/party/comments/new", {party: Party});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup topic using id
    Party.findById(req.params.id, function(err, party){
        if(err){
            console.log(err);
            res.redirect("/uniTalk/party");
        } else {
            /*console.log(req.body.partyComment);*/
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    /*req.flash("error", "Something went wrong");*/
                    /*console.log(err);*/
                } else {
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    /*comment.text = req.body.body;*/
                    comment.author.username = req.user.username;
                   /* req.user.local.username || req.user.facebook.name || req.user.twitter.username || req.user.google.name ;*/
                    // Save comment
                    comment.save();
                    party.comments.push(comment);
                    party.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/uniTalk/party/' + party._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", uniTalkMiddleware.checkPartyCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("uniTalk/party/comments/edit", {party_id: req.params.id, comment: foundComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", uniTalkMiddleware.checkPartyCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/uniTalk/party/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", uniTalkMiddleware.checkPartyCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/uniTalk/party/" + req.params.id);
        }
    });
});

module.exports = router;