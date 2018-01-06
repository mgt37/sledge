var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var BeHonestAboutSexComment    = require("../../app/models/blog/beHonestAboutSexComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    BeHonestAboutSexComment.find({}, function(err, allBeHonestAboutSexComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/beHonestAboutSexWithYourFlatmates/index", {beHonestAboutSexComment: allBeHonestAboutSexComment});
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
    var newBeHonestAboutSexComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    BeHonestAboutSexComment.create(newBeHonestAboutSexComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/beHonestAboutSexWithYourFlatmates");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/beHonestAboutSexWithYourFlatmates/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    BeHonestAboutSexComment.findById(req.params.id).populate("comments").exec(function(err, foundBeHonestAboutSexComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/beHonestAboutSexWithYourFlatmates/show", {beHonestAboutSexComment: foundBeHonestAboutSexComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkBeHonestAboutSexCommentOwnership, function(req, res){
    BeHonestAboutSexComment.findById(req.params.id, function(err, foundBeHonestAboutSexComment){
        if(err){
            res.redirect("/blog/posts/beHonestAboutSexWithYourFlatmates");
        } else {
            res.render("blog/posts/beHonestAboutSexWithYourFlatmates/edit", {beHonestAboutSexComment: foundBeHonestAboutSexComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkBeHonestAboutSexCommentOwnership, function(req, res){
    // Find and update the correct comment
    BeHonestAboutSexComment.findByIdAndUpdate(req.params.id, req.body.beHonestAboutSexComment, function(err, updatedBeHonestAboutSexComment){
        if(err){
            res.redirect("/blog/posts/beHonestAboutSexWithYourFlatmates");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/beHonestAboutSexWithYourFlatmates/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkBeHonestAboutSexCommentOwnership, function(req, res){
    BeHonestAboutSexComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/beHonestAboutSexWithYourFlatmates");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/beHonestAboutSexWithYourFlatmates");
        }
    });
});    

module.exports = router;