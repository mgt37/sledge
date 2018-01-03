var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var AucklandAsk             = require("../../app/models/askOffer/aucklandAsk");
var timestamp               = require('time-stamp');
var AucklandAskComment      = require("../../app/models/askOffer/aucklandAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    AucklandAsk.findById(req.params.id, function(err, AucklandAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/auckland/ask/comments/new", {aucklandAsk: AucklandAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup topic using id
    AucklandAsk.findById(req.params.id, function(err, aucklandAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/auckland/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            AucklandAsk.create(req.body.comment, function(err, comment){
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
                    aucklandAsk.comments.push(comment);
                    aucklandAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/auckland/ask/' + aucklandAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkAucklandAskCommentOwnership, function(req, res){
    AucklandAskComment.findById(req.params.comment_id, function(err, foundAucklandAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/auckland/ask/comments/edit", {career_id: req.params.id, comment: foundAucklandAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkAucklandAskCommentOwnership, function(req, res){
    AucklandAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedAucklandAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/auckland/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkAucklandAskCommentOwnership, function(req, res){
    AucklandAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/auckland/ask/" + req.params.id);
        }
    });
});

module.exports = router;