var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var CentralOtagoAsk             = require("../../app/models/askOffer/centralOtagoAsk");
var timestamp               = require('time-stamp');
var CentralOtagoAskComment      = require("../../app/models/askOffer/centralOtagoAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    CentralOtagoAsk.findById(req.params.id, function(err, CentralOtagoAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/centralOtago/ask/comments/new", {centralOtagoAsk: CentralOtagoAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    CentralOtagoAsk.findById(req.params.id, function(err, centralOtagoAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/centralOtago/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            CentralOtagoAskComment.create(req.body.comment, function(err, comment){
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
                    centralOtagoAsk.comments.push(comment);
                    centralOtagoAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/centralOtago/ask/' + centralOtagoAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkCentralOtagoAskCommentOwnership, function(req, res){
    CentralOtagoAskComment.findById(req.params.comment_id, function(err, foundCentralOtagoAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/centralOtago/ask/comments/edit", {centralOtagoAsk_id: req.params.id, comment: foundCentralOtagoAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkCentralOtagoAskCommentOwnership, function(req, res){
    CentralOtagoAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedCentralOtagoAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/centralOtago/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkCentralOtagoAskCommentOwnership, function(req, res){
    CentralOtagoAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/centralOtago/ask/" + req.params.id);
        }
    });
});

module.exports = router;