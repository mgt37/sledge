var Topic      = require("../app/models/topic");
var Comment    = require("../app/models/comment");

// All the middleware goes here
var middlewareObj = {};

middlewareObj.checkTopicOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Topic.findById(req.params.id, function(err, foundTopic){
            if(err){
                /*req.flash("error", "Topic not found");*/
                res.redirect("back");
            } else {
            //does user own the topic?
                if(foundTopic.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
        res.redirect("back");
        }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    //otherwise, redirect
                    /*req.flash("error", "You do not have permission to do that");*/
                    res.redirect("back");
                }
            }
            });
        } else {
        //if not, redirect
        /*req.flash("error", "You need to be logged in to do that");*/
        res.redirect("back");
        }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    /*req.flash("error", "You need to be logged in to do that");*/
    res.redirect("/login");
}

module.exports = middlewareObj;