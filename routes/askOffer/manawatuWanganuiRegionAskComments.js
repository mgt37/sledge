var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var ManawatuWanganuiRegionAsk             = require("../../app/models/askOffer/manawatuWanganuiRegionAsk");
var timestamp               = require('time-stamp');
var ManawatuWanganuiRegionAskComment      = require("../../app/models/askOffer/manawatuWanganuiRegionAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    ManawatuWanganuiRegionAsk.findById(req.params.id, function(err, ManawatuWanganuiRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/manawatuWanganuiRegion/ask/comments/new", {manawatuWanganuiRegionAsk: ManawatuWanganuiRegionAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    ManawatuWanganuiRegionAsk.findById(req.params.id, function(err, manawatuWanganuiRegionAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/manawatuWanganuiRegion/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            ManawatuWanganuiRegionAskComment.create(req.body.comment, function(err, comment){
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
                    manawatuWanganuiRegionAsk.comments.push(comment);
                    manawatuWanganuiRegionAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/manawatuWanganuiRegion/ask/' + manawatuWanganuiRegionAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkManawatuWanganuiRegionAskCommentOwnership, function(req, res){
    ManawatuWanganuiRegionAskComment.findById(req.params.comment_id, function(err, foundManawatuWanganuiRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/manawatuWanganuiRegion/ask/comments/edit", {manawatuWanganuiRegionAsk_id: req.params.id, comment: foundManawatuWanganuiRegionAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkManawatuWanganuiRegionAskCommentOwnership, function(req, res){
    ManawatuWanganuiRegionAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedManawatuWanganuiRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/manawatuWanganuiRegion/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkManawatuWanganuiRegionAskCommentOwnership, function(req, res){
    ManawatuWanganuiRegionAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/manawatuWanganuiRegion/ask/" + req.params.id);
        }
    });
});

module.exports = router;