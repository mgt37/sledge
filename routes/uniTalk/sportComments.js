var express        = require("express");
var router         = express.Router({mergeParams: true});
var Sport         = require("../../app/models/uniTalk/sport");
var timestamp      = require('time-stamp');
var Comment        = require("../../app/models/uniTalk/sportComment");
var middleware     = require("../../middleware"),
uniTalkMiddleware  = require("../../middleware/uniTalk");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    Sport.findById(req.params.id, function(err, Sport){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/sport/comments/new", {sport: Sport});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup topic using id
    Sport.findById(req.params.id, function(err, sport){
        if(err){
            console.log(err);
            res.redirect("/uniTalk/sport");
        } else {
            
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                } else {
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.text = req.body.body;
                    comment.author.username =  req.user.local.username || req.user.facebook.name || req.user.twitter.username || req.user.google.name;
                 
                    // Save comment
                    comment.save();
                    sport.comments.push(comment);
                    sport.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect('/uniTalk/sport/' + sport._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", uniTalkMiddleware.checkSportCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("uniTalk/sport/comments/edit", {sport_id: req.params.id, comment: foundComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", uniTalkMiddleware.checkSportCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/uniTalk/sport/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", uniTalkMiddleware.checkSportCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/uniTalk/sport/" + req.params.id);
        }
    });
});

module.exports = router;