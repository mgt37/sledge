var express        = require("express");
var router         = express.Router({mergeParams: true});
var Vehicle         = require("../../app/models/uniTalk/vehicle");
var timestamp      = require('time-stamp');
var Comment        = require("../../app/models/uniTalk/vehicleComment");
var middleware     = require("../../middleware"),
uniTalkMiddleware  = require("../../middleware/uniTalk");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find topic by id
    Vehicle.findById(req.params.id, function(err, Vehicle){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/vehicle/comments/new", {vehicle: Vehicle});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup topic using id
    Vehicle.findById(req.params.id, function(err, vehicle){
        if(err){
            console.log(err);
            res.redirect("/uniTalk/vehicle");
        } else {
            /*console.log(req.body.vehicleComment);*/
            Comment.create(req.body.comment, function(err, comment){
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
                    vehicle.comments.push(comment);
                    vehicle.save();
                    /*req.flash("success", "Successfully added comment");*/
                    res.redirect('/uniTalk/vehicle/' + vehicle._id);
                }
            });
        }
    });
});

// Comments EDIT
router.get("/:comment_id/edit", uniTalkMiddleware.checkVehicleCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
           res.render("uniTalk/vehicle/comments/edit", {vehicle_id: req.params.id, comment: foundComment}); 
        }
    });
});

// Comment UPDATE
router.put("/:comment_id", uniTalkMiddleware.checkVehicleCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/uniTalk/vehicle/" + req.params.id); 
        }
    });
});

// Comment DESTROY
router.delete("/:comment_id", uniTalkMiddleware.checkVehicleCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            /*req.flash("success", "Comment deleted");*/
            res.redirect("/uniTalk/vehicle/" + req.params.id);
        }
    });
});

module.exports = router;