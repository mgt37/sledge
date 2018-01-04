var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var GisborneRegionOffer             = require("../../app/models/askOffer/gisborneRegionOffer");
var timestamp               = require('time-stamp');
var GisborneRegionOfferComment      = require("../../app/models/askOffer/gisborneRegionOfferComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    GisborneRegionOffer.findById(req.params.id, function(err, GisborneRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/gisborneRegion/offer/comments/new", {gisborneRegionOffer: GisborneRegionOffer});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    GisborneRegionOffer.findById(req.params.id, function(err, gisborneRegionOffer){
        if(err){
            console.log(err);
            res.redirect("/askOffer/gisborneRegion/offer");
        } else {
            /*console.log(req.body.careerComment);*/
            GisborneRegionOfferComment.create(req.body.comment, function(err, comment){
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
                    gisborneRegionOffer.comments.push(comment);
                    gisborneRegionOffer.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/gisborneRegion/offer/' + gisborneRegionOffer._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkGisborneRegionOfferCommentOwnership, function(req, res){
    GisborneRegionOfferComment.findById(req.params.comment_id, function(err, foundGisborneRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/gisborneRegion/offer/comments/edit", {gisborneRegionOffer_id: req.params.id, comment: foundGisborneRegionOfferComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkGisborneRegionOfferCommentOwnership, function(req, res){
    GisborneRegionOfferComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedGisborneRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/gisborneRegion/offer/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkGisborneRegionOfferCommentOwnership, function(req, res){
    GisborneRegionOfferComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/gisborneRegion/offer/" + req.params.id);
        }
    });
});

module.exports = router;