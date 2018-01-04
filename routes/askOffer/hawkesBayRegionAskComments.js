var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var HawkesBayRegionAsk             = require("../../app/models/askOffer/hawkesBayRegionAsk");
var timestamp               = require('time-stamp');
var HawkesBayRegionAskComment      = require("../../app/models/askOffer/hawkesBayRegionAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    HawkesBayRegionAsk.findById(req.params.id, function(err, HawkesBayRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/hawkesBayRegion/ask/comments/new", {hawkesBayRegionAsk: HawkesBayRegionAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    HawkesBayRegionAsk.findById(req.params.id, function(err, hawkesBayRegionAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/hawkesBayRegion/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            HawkesBayRegionAskComment.create(req.body.comment, function(err, comment){
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
                    hawkesBayRegionAsk.comments.push(comment);
                    hawkesBayRegionAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/hawkesBayRegion/ask/' + hawkesBayRegionAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkHawkesBayRegionAskCommentOwnership, function(req, res){
    HawkesBayRegionAskComment.findById(req.params.comment_id, function(err, foundHawkesBayRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/hawkesBayRegion/ask/comments/edit", {hawkesBayRegionAsk_id: req.params.id, comment: foundHawkesBayRegionAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkHawkesBayRegionAskCommentOwnership, function(req, res){
    HawkesBayRegionAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedHawkesBayRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/hawkesBayRegion/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkHawkesBayRegionAskCommentOwnership, function(req, res){
    HawkesBayRegionAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/hawkesBayRegion/ask/" + req.params.id);
        }
    });
});

module.exports = router;