var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var WellingtonOffer             = require("../../app/models/askOffer/wellingtonOffer");
var timestamp               = require('time-stamp');
var WellingtonOfferComment      = require("../../app/models/askOffer/wellingtonOfferComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    WellingtonOffer.findById(req.params.id, function(err, WellingtonOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/wellington/offer/comments/new", {wellingtonOffer: WellingtonOffer});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    WellingtonOffer.findById(req.params.id, function(err, wellingtonOffer){
        if(err){
            console.log(err);
            res.redirect("/askOffer/wellington/offer");
        } else {
            /*console.log(req.body.careerComment);*/
            WellingtonOfferComment.create(req.body.comment, function(err, comment){
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
                    wellingtonOffer.comments.push(comment);
                    wellingtonOffer.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/wellington/offer/' + wellingtonOffer._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkWellingtonOfferCommentOwnership, function(req, res){
    WellingtonOfferComment.findById(req.params.comment_id, function(err, foundWellingtonOfferComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/wellington/offer/comments/edit", {wellingtonOffer_id: req.params.id, comment: foundWellingtonOfferComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkWellingtonOfferCommentOwnership, function(req, res){
    WellingtonOfferComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedWellingtonOfferComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/wellington/offer/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkWellingtonOfferCommentOwnership, function(req, res){
    WellingtonOfferComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/wellington/offer/" + req.params.id);
        }
    });
});

module.exports = router;