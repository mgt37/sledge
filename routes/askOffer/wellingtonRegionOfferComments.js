var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var WellingtonRegionOffer             = require("../../app/models/askOffer/wellingtonRegionOffer");
var timestamp               = require('time-stamp');
var WellingtonRegionOfferComment      = require("../../app/models/askOffer/wellingtonRegionOfferComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    WellingtonRegionOffer.findById(req.params.id, function(err, WellingtonRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/wellingtonRegion/offer/comments/new", {wellingtonRegionOffer: WellingtonRegionOffer});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    WellingtonRegionOffer.findById(req.params.id, function(err, wellingtonRegionOffer){
        if(err){
            console.log(err);
            res.redirect("/askOffer/wellingtonRegion/offer");
        } else {
            /*console.log(req.body.careerComment);*/
            WellingtonRegionOfferComment.create(req.body.comment, function(err, comment){
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
                    wellingtonRegionOffer.comments.push(comment);
                    wellingtonRegionOffer.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/wellingtonRegion/offer/' + wellingtonRegionOffer._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkWellingtonRegionOfferCommentOwnership, function(req, res){
    WellingtonRegionOfferComment.findById(req.params.comment_id, function(err, foundWellingtonRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/wellingtonRegion/offer/comments/edit", {wellingtonRegionOffer_id: req.params.id, comment: foundWellingtonRegionOfferComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkWellingtonRegionOfferCommentOwnership, function(req, res){
    WellingtonRegionOfferComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedWellingtonRegionOfferComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/wellingtonRegion/offer/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkWellingtonRegionOfferCommentOwnership, function(req, res){
    WellingtonRegionOfferComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/wellingtonRegion/offer/" + req.params.id);
        }
    });
});

module.exports = router;