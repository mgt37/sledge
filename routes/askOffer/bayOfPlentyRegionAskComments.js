var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var BayOfPlentyRegionAsk             = require("../../app/models/askOffer/bayOfPlentyRegionAsk");
var timestamp               = require('time-stamp');
var BayOfPlentyRegionAskComment      = require("../../app/models/askOffer/bayOfPlentyRegionAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    BayOfPlentyRegionAsk.findById(req.params.id, function(err, BayOfPlentyRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/bayOfPlentyRegion/ask/comments/new", {bayOfPlentyRegionAsk: BayOfPlentyRegionAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    BayOfPlentyRegionAsk.findById(req.params.id, function(err, bayOfPlentyRegionAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/bayOfPlentyRegion/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            BayOfPlentyRegionAskComment.create(req.body.comment, function(err, comment){
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
                    bayOfPlentyRegionAsk.comments.push(comment);
                    bayOfPlentyRegionAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/bayOfPlentyRegion/ask/' + bayOfPlentyRegionAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkBayOfPlentyRegionAskCommentOwnership, function(req, res){
    BayOfPlentyRegionAskComment.findById(req.params.comment_id, function(err, foundBayOfPlentyRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/bayOfPlentyRegion/ask/comments/edit", {bayOfPlentyRegionAsk_id: req.params.id, comment: foundBayOfPlentyRegionAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkBayOfPlentyRegionAskCommentOwnership, function(req, res){
    BayOfPlentyRegionAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedBayOfPlentyRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/bayOfPlentyRegion/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkBayOfPlentyRegionAskCommentOwnership, function(req, res){
    BayOfPlentyRegionAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/bayOfPlentyRegion/ask/" + req.params.id);
        }
    });
});

module.exports = router;