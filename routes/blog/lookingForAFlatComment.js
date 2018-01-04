var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var LookingForAFlatComment    = require("../../app/models/blog/lookingForAFlatComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    LookingForAFlatComment.find({}, function(err, allLookingForAFlatComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/whatIsImportantToConsiderWhenLookingForAFlat/index", {lookingForAFlatComment: allLookingForAFlatComment});
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
    var newLookingForAFlatComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    LookingForAFlatComment.create(newLookingForAFlatComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/whatIsImportantToConsiderWhenLookingForAFlat");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/whatIsImportantToConsiderWhenLookingForAFlat/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    LookingForAFlatComment.findById(req.params.id).populate("comments").exec(function(err, foundLookingForAFlatComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/whatIsImportantToConsiderWhenLookingForAFlat/show", {lookingForAFlatComment: foundLookingForAFlatComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkLookingForAFlatCommentOwnership, function(req, res){
    LookingForAFlatComment.findById(req.params.id, function(err, foundLookingForAFlatComment){
        if(err){
            res.redirect("/blog/posts/whatIsImportantToConsiderWhenLookingForAFlat");
        } else {
            res.render("blog/posts/whatIsImportantToConsiderWhenLookingForAFlat/edit", {lookingForAFlatComment: foundLookingForAFlatComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkLookingForAFlatCommentOwnership, function(req, res){
    // Find and update the correct comment
    LookingForAFlatComment.findByIdAndUpdate(req.params.id, req.body.lookingForAFlatComment, function(err, updatedLookingForAFlatComment){
        if(err){
            res.redirect("/blog/posts/whatIsImportantToConsiderWhenLookingForAFlat");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/whatIsImportantToConsiderWhenLookingForAFlat/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkLookingForAFlatCommentOwnership, function(req, res){
    LookingForAFlatComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/whatIsImportantToConsiderWhenLookingForAFlat");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/whatIsImportantToConsiderWhenLookingForAFlat");
        }
    });
});    

module.exports = router;