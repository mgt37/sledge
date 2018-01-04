var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var GisborneRegionAsk             = require("../../app/models/askOffer/gisborneRegionAsk");
var timestamp               = require('time-stamp');
var GisborneRegionAskComment      = require("../../app/models/askOffer/gisborneRegionAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    GisborneRegionAsk.findById(req.params.id, function(err, GisborneRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/gisborneRegion/ask/comments/new", {gisborneRegionAsk: GisborneRegionAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    GisborneRegionAsk.findById(req.params.id, function(err, gisborneRegionAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/gisborneRegion/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            GisborneRegionAskComment.create(req.body.comment, function(err, comment){
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
                    gisborneRegionAsk.comments.push(comment);
                    gisborneRegionAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/gisborneRegion/ask/' + gisborneRegionAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkGisborneRegionAskCommentOwnership, function(req, res){
    GisborneRegionAskComment.findById(req.params.comment_id, function(err, foundGisborneRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/gisborneRegion/ask/comments/edit", {gisborneRegionAsk_id: req.params.id, comment: foundGisborneRegionAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkGisborneRegionAskCommentOwnership, function(req, res){
    GisborneRegionAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedGisborneRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/gisborneRegion/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkGisborneRegionAskCommentOwnership, function(req, res){
    GisborneRegionAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/gisborneRegion/ask/" + req.params.id);
        }
    });
});

module.exports = router;