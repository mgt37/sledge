var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var WestCoastRegionOffer             = require("../../app/models/askOffer/westCoastRegionOffer");
var timestamp               = require('time-stamp');
var WestCoastRegionOfferComment      = require("../../app/models/askOffer/westCoastRegionOfferComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    WestCoastRegionOffer.findById(req.params.id, function(err, WestCoastRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/westCoastRegion/offer/comments/new", {westCoastRegionOffer: WestCoastRegionOffer});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    WestCoastRegionOffer.findById(req.params.id, function(err, westCoastRegionOffer){
        if(err){
            console.log(err);
            res.redirect("/askOffer/westCoastRegion/offer");
        } else {
            /*console.log(req.body.careerComment);*/
            WestCoastRegionOfferComment.create(req.body.comment, function(err, comment){
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
                    westCoastRegionOffer.comments.push(comment);
                    westCoastRegionOffer.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/westCoastRegion/offer/' + westCoastRegionOffer._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkWestCoastRegionOfferCommentOwnership, function(req, res){
    WestCoastRegionOfferComment.findById(req.params.comment_id, function(err, foundWestCoastRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/westCoastRegion/offer/comments/edit", {westCoastRegionOffer_id: req.params.id, comment: foundWestCoastRegionOfferComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkWestCoastRegionOfferCommentOwnership, function(req, res){
    WestCoastRegionOfferComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedWestCoastRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/westCoastRegion/offer/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkWestCoastRegionOfferCommentOwnership, function(req, res){
    WestCoastRegionOfferComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/westCoastRegion/offer/" + req.params.id);
        }
    });
});

module.exports = router;