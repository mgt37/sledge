var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var ThinkAboutDepressionComment    = require("../../app/models/blog/thinkAboutDepressionComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    ThinkAboutDepressionComment.find({}, function(err, allThinkAboutDepressionComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/takeSomeTimeToThinkAboutDepression/index", {thinkAboutDepressionComment: allThinkAboutDepressionComment});
        }
    });
});

//CREATE - add new comment to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to comments array
    var blogComment   = req.body.blogComment;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newThinkAboutDepressionComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    ThinkAboutDepressionComment.create(newThinkAboutDepressionComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/takeSomeTimeToThinkAboutDepression");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/takeSomeTimeToThinkAboutDepression/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    ThinkAboutDepressionComment.findById(req.params.id).populate("comments").exec(function(err, foundThinkAboutDepressionComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/takeSomeTimeToThinkAboutDepression/show", {thinkAboutDepressionComment: foundThinkAboutDepressionComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkThinkAboutDepressionCommentOwnership, function(req, res){
    ThinkAboutDepressionComment.findById(req.params.id, function(err, foundThinkAboutDepressionComment){
        if(err){
            res.redirect("/blog/posts/takeSomeTimeToThinkAboutDepression");
        } else {
            res.render("blog/posts/takeSomeTimeToThinkAboutDepression/edit", {thinkAboutDepressionComment: foundThinkAboutDepressionComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkThinkAboutDepressionCommentOwnership, function(req, res){
    // Find and update the correct comment
    ThinkAboutDepressionComment.findByIdAndUpdate(req.params.id, req.body.thinkAboutDepressionComment, function(err, updatedThinkAboutDepressionComment){
        if(err){
            res.redirect("/blog/posts/takeSomeTimeToThinkAboutDepression");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/takeSomeTimeToThinkAboutDepression/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkThinkAboutDepressionCommentOwnership, function(req, res){
    ThinkAboutDepressionComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/takeSomeTimeToThinkAboutDepression");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/takeSomeTimeToThinkAboutDepression");
        }
    });
});    

module.exports = router;