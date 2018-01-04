var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var TaranakiRegionAsk             = require("../../app/models/askOffer/taranakiRegionAsk");
var timestamp               = require('time-stamp');
var TaranakiRegionAskComment      = require("../../app/models/askOffer/taranakiRegionAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    TaranakiRegionAsk.findById(req.params.id, function(err, TaranakiRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/taranakiRegion/ask/comments/new", {taranakiRegionAsk: TaranakiRegionAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    TaranakiRegionAsk.findById(req.params.id, function(err, taranakiRegionAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/taranakiRegion/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            TaranakiRegionAskComment.create(req.body.comment, function(err, comment){
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
                    taranakiRegionAsk.comments.push(comment);
                    taranakiRegionAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/taranakiRegion/ask/' + taranakiRegionAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkTaranakiRegionAskCommentOwnership, function(req, res){
    TaranakiRegionAskComment.findById(req.params.comment_id, function(err, foundTaranakiRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/taranakiRegion/ask/comments/edit", {taranakiRegionAsk_id: req.params.id, comment: foundTaranakiRegionAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkTaranakiRegionAskCommentOwnership, function(req, res){
    TaranakiRegionAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedTaranakiRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/taranakiRegion/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkTaranakiRegionAskCommentOwnership, function(req, res){
    TaranakiRegionAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/taranakiRegion/ask/" + req.params.id);
        }
    });
});

module.exports = router;