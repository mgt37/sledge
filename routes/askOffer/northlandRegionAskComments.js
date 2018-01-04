var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var NorthlandRegionAsk             = require("../../app/models/askOffer/northlandRegionAsk");
var timestamp               = require('time-stamp');
var NorthlandRegionAskComment      = require("../../app/models/askOffer/northlandRegionAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    NorthlandRegionAsk.findById(req.params.id, function(err, NorthlandRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/northlandRegion/ask/comments/new", {northlandRegionAsk: NorthlandRegionAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    NorthlandRegionAsk.findById(req.params.id, function(err, northlandRegionAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/northlandRegion/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            NorthlandRegionAskComment.create(req.body.comment, function(err, comment){
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
                    northlandRegionAsk.comments.push(comment);
                    northlandRegionAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/northlandRegion/ask/' + northlandRegionAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkNorthlandRegionAskCommentOwnership, function(req, res){
    NorthlandRegionAskComment.findById(req.params.comment_id, function(err, foundNorthlandRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/northlandRegion/ask/comments/edit", {northlandRegionAsk_id: req.params.id, comment: foundNorthlandRegionAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkNorthlandRegionAskCommentOwnership, function(req, res){
    NorthlandRegionAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedNorthlandRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/northlandRegion/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkNorthlandRegionAskCommentOwnership, function(req, res){
    NorthlandRegionAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/northlandRegion/ask/" + req.params.id);
        }
    });
});

module.exports = router;