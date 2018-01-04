var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var CentralOtagoOffer             = require("../../app/models/askOffer/centralOtagoOffer");
var timestamp               = require('time-stamp');
var CentralOtagoOfferComment      = require("../../app/models/askOffer/centralOtagoOfferComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    CentralOtagoOffer.findById(req.params.id, function(err, CentralOtagoOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/centralOtago/offer/comments/new", {centralOtagoOffer: CentralOtagoOffer});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    CentralOtagoOffer.findById(req.params.id, function(err, centralOtagoOffer){
        if(err){
            console.log(err);
            res.redirect("/askOffer/centralOtago/offer");
        } else {
            /*console.log(req.body.careerComment);*/
            CentralOtagoOfferComment.create(req.body.comment, function(err, comment){
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
                    centralOtagoOffer.comments.push(comment);
                    centralOtagoOffer.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/centralOtago/offer/' + centralOtagoOffer._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkCentralOtagoOfferCommentOwnership, function(req, res){
    CentralOtagoOfferComment.findById(req.params.comment_id, function(err, foundCentralOtagoOfferComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/centralOtago/offer/comments/edit", {centralOtagoOffer_id: req.params.id, comment: foundCentralOtagoOfferComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkCentralOtagoOfferCommentOwnership, function(req, res){
    CentralOtagoOfferComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedCentralOtagoOfferComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/centralOtago/offer/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkCentralOtagoOfferCommentOwnership, function(req, res){
    CentralOtagoOfferComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/centralOtago/offer/" + req.params.id);
        }
    });
});

module.exports = router;