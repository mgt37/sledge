var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var Comment    = require("../../app/models/blog/talkToARecruitmentAgentComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    Comment.find({}, function(err, allComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/talkToARecruitmentAgentAndStartYourCareer/index", {comment: allComment});
        }
    });
});

//CREATE - add new comment to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to comments array
    var blogComment   = req.body.blogComment;
    var author = {
        id: req.user._id,
        username:  req.user.local.username || req.user.facebook.name || req.user.twitter.username || req.user.google.name
    };
    var newComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    Comment.create(newComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/talkToARecruitmentAgentAndStartYourCareer");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/talkToARecruitmentAgentAndStartYourCareer/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    Comment.findById(req.params.id).populate("comments").exec(function(err, foundComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/talkToARecruitmentAgentAndStartYourCareer/show", {comment: foundComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkTalkToARecruitmentAgentCommentOwnership, function(req, res){
    Comment.findById(req.params.id, function(err, foundComment){
        if(err){
            res.redirect("/blog/posts/talkToARecruitmentAgentAndStartYourCareer");
        } else {
            res.render("blog/posts/talkToARecruitmentAgentAndStartYourCareer/edit", {comment: foundComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkTalkToARecruitmentAgentCommentOwnership, function(req, res){
    // Find and update the correct comment
    Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("/blog/posts/talkToARecruitmentAgentAndStartYourCareer");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/talkToARecruitmentAgentAndStartYourCareer/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkTalkToARecruitmentAgentCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/talkToARecruitmentAgentAndStartYourCareer");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/talkToARecruitmentAgentAndStartYourCareer");
        }
    });
});    

module.exports = router;