var express                 = require("express");
var router                  = express.Router({mergeParams: true});
var HamiltonAsk             = require("../../app/models/askOffer/hamiltonAsk");
var timestamp               = require('time-stamp');
var HamiltonAskComment      = require("../../app/models/askOffer/hamiltonAskComment");
var middleware              = require("../../middleware"),
askOfferMiddleware           = require("../../middleware/askOffer");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    HamiltonAsk.findById(req.params.id, function(err, HamiltonAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/hamilton/ask/comments/new", {hamiltonAsk: HamiltonAsk});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup comment using id
    HamiltonAsk.findById(req.params.id, function(err, hamiltonAsk){
        if(err){
            console.log(err);
            res.redirect("/askOffer/hamilton/ask");
        } else {
            /*console.log(req.body.careerComment);*/
            HamiltonAskComment.create(req.body.comment, function(err, comment){
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
                    hamiltonAsk.comments.push(comment);
                    hamiltonAsk.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/askOffer/hamilton/ask/' + hamiltonAsk._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", askOfferMiddleware.checkHamiltonAskCommentOwnership, function(req, res){
    HamiltonAskComment.findById(req.params.comment_id, function(err, foundHamiltonAskComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("askOffer/hamilton/ask/comments/edit", {hamiltonAsk_id: req.params.id, comment: foundHamiltonAskComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", askOfferMiddleware.checkHamiltonAskCommentOwnership, function(req, res){
    HamiltonAskComment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedHamiltonAskComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/askOffer/hamilton/ask/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", askOfferMiddleware.checkHamiltonAskCommentOwnership, function(req, res){
    HamiltonAskComment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/askOffer/hamilton/ask/" + req.params.id);
        }
    });
});

module.exports = router;