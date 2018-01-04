var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var HamiltonOffer             = require("../../app/models/askOffer/hamiltonOffer");
var timestamp               = require('time-stamp');
var HamiltonOfferComment      = require("../../app/models/askOffer/hamiltonOfferComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    HamiltonOffer.findById(req.params.id, function(err, HamiltonOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/hamilton/offer/comments/new", {hamiltonOffer: HamiltonOffer});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    HamiltonOffer.findById(req.params.id, function(err, hamiltonOffer){
        if(err){
            console.log(err);
            res.redirect("/askOffer/hamilton/offer");
        } else {
            /*console.log(req.body.careerComment);*/
            HamiltonOfferComment.create(req.body.comment, function(err, comment){
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
                    hamiltonOffer.comments.push(comment);
                    hamiltonOffer.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/hamilton/offer/' + hamiltonOffer._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkHamiltonOfferCommentOwnership, function(req, res){
    HamiltonOfferComment.findById(req.params.comment_id, function(err, foundHamiltonOfferComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/hamilton/offer/comments/edit", {hamiltonOffer_id: req.params.id, comment: foundHamiltonOfferComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkHamiltonOfferCommentOwnership, function(req, res){
    HamiltonOfferComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedHamiltonOfferComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/hamilton/offer/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkHamiltonOfferCommentOwnership, function(req, res){
    HamiltonOfferComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/hamilton/offer/" + req.params.id);
        }
    });
});

module.exports = router;