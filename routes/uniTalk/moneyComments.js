var express        = require("express");
var router         = express.Router({mergeParams: true});
var Money         = require("../../app/models/uniTalk/money");
var timestamp      = require('time-stamp');
var Comment        = require("../../app/models/uniTalk/moneyComment");
var middleware     = require("../../middleware"),
uniTalkMiddleware  = require("../../middleware/uniTalk");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    Money.findById(req.params.id, function(err, Money){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/money/comments/new", {money: Money});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup topic using id
    Money.findById(req.params.id, function(err, money){
        if(err){
            console.log(err);
            res.redirect("/uniTalk/money");
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
                    money.comments.push(comment);
                    money.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect('/uniTalk/money/' + money._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", uniTalkMiddleware.checkMoneyCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("uniTalk/money/comments/edit", {money_id: req.params.id, comment: foundComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", uniTalkMiddleware.checkMoneyCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/uniTalk/money/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", uniTalkMiddleware.checkMoneyCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/uniTalk/money/" + req.params.id);
        }
    });
});

module.exports = router;