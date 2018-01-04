var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var WellingtonRegionAsk             = require("../../app/models/askOffer/wellingtonRegionAsk");
var timestamp               = require('time-stamp');
var WellingtonRegionAskComment      = require("../../app/models/askOffer/wellingtonRegionAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    WellingtonRegionAsk.findById(req.params.id, function(err, WellingtonRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/wellingtonRegion/ask/comments/new", {wellingtonRegionAsk: WellingtonRegionAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    WellingtonRegionAsk.findById(req.params.id, function(err, wellingtonRegionAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/wellingtonRegion/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            WellingtonRegionAskComment.create(req.body.comment, function(err, comment){
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
                    wellingtonRegionAsk.comments.push(comment);
                    wellingtonRegionAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/wellingtonRegion/ask/' + wellingtonRegionAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkWellingtonRegionAskCommentOwnership, function(req, res){
    WellingtonRegionAskComment.findById(req.params.comment_id, function(err, foundWellingtonRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/wellingtonRegion/ask/comments/edit", {wellingtonRegionAsk_id: req.params.id, comment: foundWellingtonRegionAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkWellingtonRegionAskCommentOwnership, function(req, res){
    WellingtonRegionAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedWellingtonRegionAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/wellingtonRegion/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkWellingtonRegionAskCommentOwnership, function(req, res){
    WellingtonRegionAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/wellingtonRegion/ask/" + req.params.id);
        }
    });
});

module.exports = router;