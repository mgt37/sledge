var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var ManawatuWanganuiRegionOffer             = require("../../app/models/askOffer/manawatuWanganuiRegionOffer");
var timestamp               = require('time-stamp');
var ManawatuWanganuiRegionOfferComment      = require("../../app/models/askOffer/manawatuWanganuiRegionOfferComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    ManawatuWanganuiRegionOffer.findById(req.params.id, function(err, ManawatuWanganuiRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/manawatuWanganuiRegion/offer/comments/new", {manawatuWanganuiRegionOffer: ManawatuWanganuiRegionOffer});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    ManawatuWanganuiRegionOffer.findById(req.params.id, function(err, manawatuWanganuiRegionOffer){
        if(err){
            console.log(err);
            res.redirect("/askOffer/manawatuWanganuiRegion/offer");
        } else {
            /*console.log(req.body.careerComment);*/
            ManawatuWanganuiRegionOfferComment.create(req.body.comment, function(err, comment){
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
                    manawatuWanganuiRegionOffer.comments.push(comment);
                    manawatuWanganuiRegionOffer.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/manawatuWanganuiRegion/offer/' + manawatuWanganuiRegionOffer._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkManawatuWanganuiRegionOfferCommentOwnership, function(req, res){
    ManawatuWanganuiRegionOfferComment.findById(req.params.comment_id, function(err, foundManawatuWanganuiRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/manawatuWanganuiRegion/offer/comments/edit", {manawatuWanganuiRegionOffer_id: req.params.id, comment: foundManawatuWanganuiRegionOfferComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkManawatuWanganuiRegionOfferCommentOwnership, function(req, res){
    ManawatuWanganuiRegionOfferComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedManawatuWanganuiRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/manawatuWanganuiRegion/offer/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkManawatuWanganuiRegionOfferCommentOwnership, function(req, res){
    ManawatuWanganuiRegionOfferComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/manawatuWanganuiRegion/offer/" + req.params.id);
        }
    });
});

module.exports = router;