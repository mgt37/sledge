var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var CoastalOtagoOffer             = require("../../app/models/askOffer/coastalOtagoOffer");
var timestamp               = require('time-stamp');
var CoastalOtagoOfferComment      = require("../../app/models/askOffer/coastalOtagoOfferComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    CoastalOtagoOffer.findById(req.params.id, function(err, CoastalOtagoOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/coastalOtago/offer/comments/new", {coastalOtagoOffer: CoastalOtagoOffer});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    CoastalOtagoOffer.findById(req.params.id, function(err, coastalOtagoOffer){
        if(err){
            console.log(err);
            res.redirect("/askOffer/coastalOtago/offer");
        } else {
            /*console.log(req.body.careerComment);*/
            CoastalOtagoOfferComment.create(req.body.comment, function(err, comment){
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
                    coastalOtagoOffer.comments.push(comment);
                    coastalOtagoOffer.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/coastalOtago/offer/' + coastalOtagoOffer._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkCoastalOtagoOfferCommentOwnership, function(req, res){
    CoastalOtagoOfferComment.findById(req.params.comment_id, function(err, foundCoastalOtagoOfferComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/coastalOtago/offer/comments/edit", {coastalOtagoOffer_id: req.params.id, comment: foundCoastalOtagoOfferComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkCoastalOtagoOfferCommentOwnership, function(req, res){
    CoastalOtagoOfferComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedCoastalOtagoOfferComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/coastalOtago/offer/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkCoastalOtagoOfferCommentOwnership, function(req, res){
    CoastalOtagoOfferComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/coastalOtago/offer/" + req.params.id);
        }
    });
});

module.exports = router;