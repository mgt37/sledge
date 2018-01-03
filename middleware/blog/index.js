var HayfeverTreatmentComment    = require("../../app/models/blog/hayfeverTreatmentComment");
var LookingForAFlatComment    = require("../../app/models/blog/lookingForAFlatComment");
    
// All the middleware goes here
var middlewareObj = {};

middlewareObj.checkHayfeverTreatmentCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        HayfeverTreatmentComment.findById(req.params.id, function(err, foundHayfeverTreatmentComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundHayfeverTreatmentComment.author.id.equals(req.user._id)){
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

middlewareObj.checkLookingForAFlatCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        LookingForAFlatComment.findById(req.params.id, function(err, foundLookingForAFlatComment){
            if(err){
                /*req.flash("error", "Comment not found");*/
                res.redirect("back");
            } else {
            //does user own the comment?
                if(foundLookingForAFlatComment.author.id.equals(req.user._id)){
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

module.exports = middlewareObj;