var express           = require("express");
var router            = express();
var timestamp         = require('time-stamp');
var BHASWYF           = require("../../app/models/blog/bHASWYF");
var middleware        = require("../../middleware"),
blogMiddleware        = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    BHASWYF.find({}, function(err, allBHASWYF){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/bHASWYF/index", {bHASWYF: BHASWYF});
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
    var newBHASWYF= ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    BHASWYF.create(newBHASWYF, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/bHASWYF");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/bHASWYF/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    BHASWYF.findById(req.params.id).populate("comments").exec(function(err, BHASWYF){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/bHASWYF/show", {bHASWYF: BHASWYF});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkBHASWYFOwnership, function(req, res){
    BHASWYF.findById(req.params.id, function(err, foundBHASWYF){
        if(err){
            res.redirect("/blog/posts/bHASWYF");
        } else {
            res.render("blog/posts/bHASWYF/edit", {bHASWYF: foundBHASWYF});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkBHASWYFOwnership, function(req, res){
    // Find and update the correct comment
    BHASWYF.findByIdAndUpdate(req.params.id, req.body.bHASWYF, function(err, updatedBHASWYF){
        if(err){
            res.redirect("/blog/posts/bHASWYF");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/bHASWYF/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkBHASWYFOwnership, function(req, res){
    BHASWYF.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/bHASWYF");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/bHASWYF");
        }
    });
});    

module.exports = router;