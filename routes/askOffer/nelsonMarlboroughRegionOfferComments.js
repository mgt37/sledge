var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var NelsonMarlboroughRegionOffer             = require("../../app/models/askOffer/nelsonMarlboroughRegionOffer");
var timestamp               = require('time-stamp');
var NelsonMarlboroughRegionOfferComment      = require("../../app/models/askOffer/nelsonMarlboroughRegionOfferComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    NelsonMarlboroughRegionOffer.findById(req.params.id, function(err, NelsonMarlboroughRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/nelsonMarlboroughRegion/offer/comments/new", {nelsonMarlboroughRegionOffer: NelsonMarlboroughRegionOffer});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    NelsonMarlboroughRegionOffer.findById(req.params.id, function(err, nelsonMarlboroughRegionOffer){
        if(err){
            console.log(err);
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer");
        } else {
            /*console.log(req.body.careerComment);*/
            NelsonMarlboroughRegionOfferComment.create(req.body.comment, function(err, comment){
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
                    nelsonMarlboroughRegionOffer.comments.push(comment);
                    nelsonMarlboroughRegionOffer.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/nelsonMarlboroughRegion/offer/' + nelsonMarlboroughRegionOffer._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkNelsonMarlboroughRegionOfferCommentOwnership, function(req, res){
    NelsonMarlboroughRegionOfferComment.findById(req.params.comment_id, function(err, foundNelsonMarlboroughRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/nelsonMarlboroughRegion/offer/comments/edit", {nelsonMarlboroughRegionOffer_id: req.params.id, comment: foundNelsonMarlboroughRegionOfferComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkNelsonMarlboroughRegionOfferCommentOwnership, function(req, res){
    NelsonMarlboroughRegionOfferComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedNelsonMarlboroughRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkNelsonMarlboroughRegionOfferCommentOwnership, function(req, res){
    NelsonMarlboroughRegionOfferComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer/" + req.params.id);
        }
    });
});

module.exports = router;