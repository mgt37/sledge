var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var WellingtonAsk             = require("../../app/models/askOffer/wellingtonAsk");
var timestamp               = require('time-stamp');
var WellingtonAskComment      = require("../../app/models/askOffer/wellingtonAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    WellingtonAsk.findById(req.params.id, function(err, WellingtonAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/wellington/ask/comments/new", {wellingtonAsk: WellingtonAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    WellingtonAsk.findById(req.params.id, function(err, wellingtonAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/wellington/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            WellingtonAskComment.create(req.body.comment, function(err, comment){
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
                    wellingtonAsk.comments.push(comment);
                    wellingtonAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/wellington/ask/' + wellingtonAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkWellingtonAskCommentOwnership, function(req, res){
    WellingtonAskComment.findById(req.params.comment_id, function(err, foundWellingtonAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/wellington/ask/comments/edit", {wellingtonAsk_id: req.params.id, comment: foundWellingtonAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkWellingtonAskCommentOwnership, function(req, res){
    WellingtonAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedWellingtonAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/wellington/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkWellingtonAskCommentOwnership, function(req, res){
    WellingtonAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/wellington/ask/" + req.params.id);
        }
    });
});

module.exports = router;