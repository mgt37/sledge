var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var HawkesBayRegionOffer             = require("../../app/models/askOffer/hawkesBayRegionOffer");
var timestamp               = require('time-stamp');
var HawkesBayRegionOfferComment      = require("../../app/models/askOffer/hawkesBayRegionOfferComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    HawkesBayRegionOffer.findById(req.params.id, function(err, HawkesBayRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/hawkesBayRegion/offer/comments/new", {hawkesBayRegionOffer: HawkesBayRegionOffer});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    HawkesBayRegionOffer.findById(req.params.id, function(err, hawkesBayRegionOffer){
        if(err){
            console.log(err);
            res.redirect("/askOffer/hawkesBayRegion/offer");
        } else {
            /*console.log(req.body.careerComment);*/
            HawkesBayRegionOfferComment.create(req.body.comment, function(err, comment){
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
                    hawkesBayRegionOffer.comments.push(comment);
                    hawkesBayRegionOffer.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/hawkesBayRegion/offer/' + hawkesBayRegionOffer._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkHawkesBayRegionOfferCommentOwnership, function(req, res){
    HawkesBayRegionOfferComment.findById(req.params.comment_id, function(err, foundHawkesBayRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/hawkesBayRegion/offer/comments/edit", {hawkesBayRegionOffer_id: req.params.id, comment: foundHawkesBayRegionOfferComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkHawkesBayRegionOfferCommentOwnership, function(req, res){
    HawkesBayRegionOfferComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedHawkesBayRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/hawkesBayRegion/offer/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkHawkesBayRegionOfferCommentOwnership, function(req, res){
    HawkesBayRegionOfferComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/hawkesBayRegion/offer/" + req.params.id);
        }
    });
});

module.exports = router;