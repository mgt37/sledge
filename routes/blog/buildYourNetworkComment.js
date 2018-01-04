var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var BuildYourNetworkComment    = require("../../app/models/blog/buildYourNetworkComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    BuildYourNetworkComment.find({}, function(err, allBuildYourNetworkComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/beSocialAndBuildYourNetwork/index", {buildYourNetworkComment: allBuildYourNetworkComment});
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
    var newBuildYourNetworkComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    BuildYourNetworkComment.create(newBuildYourNetworkComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/beSocialAndBuildYourNetwork");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/beSocialAndBuildYourNetwork/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    BuildYourNetworkComment.findById(req.params.id).populate("comments").exec(function(err, foundBuildYourNetworkComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/beSocialAndBuildYourNetwork/show", {buildYourNetworkComment: foundBuildYourNetworkComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkBuildYourNetworkCommentOwnership, function(req, res){
    BuildYourNetworkComment.findById(req.params.id, function(err, foundBuildYourNetworkComment){
        if(err){
            res.redirect("/blog/posts/beSocialAndBuildYourNetwork");
        } else {
            res.render("blog/posts/beSocialAndBuildYourNetwork/edit", {buildYourNetworkComment: foundBuildYourNetworkComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkBuildYourNetworkCommentOwnership, function(req, res){
    // Find and update the correct comment
    BuildYourNetworkComment.findByIdAndUpdate(req.params.id, req.body.buildYourNetworkComment, function(err, updatedBuildYourNetworkComment){
        if(err){
            res.redirect("/blog/posts/beSocialAndBuildYourNetwork");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/beSocialAndBuildYourNetwork/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkBuildYourNetworkCommentOwnership, function(req, res){
    BuildYourNetworkComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/beSocialAndBuildYourNetwork");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/beSocialAndBuildYourNetwork");
        }
    });
});    

module.exports = router;