var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var MoreThanJustBreakfastComment    = require("../../app/models/blog/moreThanJustBreakfastComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    MoreThanJustBreakfastComment.find({}, function(err, allMoreThanJustBreakfastComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/thereIsMoreToItThanJustBreakfast/index", {moreThanJustBreakfastComment: allMoreThanJustBreakfastComment});
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
    var newMoreThanJustBreakfastComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    MoreThanJustBreakfastComment.create(newMoreThanJustBreakfastComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/thereIsMoreToItThanJustBreakfast");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/thereIsMoreToItThanJustBreakfast/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    MoreThanJustBreakfastComment.findById(req.params.id).populate("comments").exec(function(err, foundMoreThanJustBreakfastComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/thereIsMoreToItThanJustBreakfast/show", {moreThanJustBreakfastComment: foundMoreThanJustBreakfastComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkMoreThanJustBreakfastCommentOwnership, function(req, res){
    MoreThanJustBreakfastComment.findById(req.params.id, function(err, foundMoreThanJustBreakfastComment){
        if(err){
            res.redirect("/blog/posts/thereIsMoreToItThanJustBreakfast");
        } else {
            res.render("blog/posts/thereIsMoreToItThanJustBreakfast/edit", {moreThanJustBreakfastComment: foundMoreThanJustBreakfastComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkMoreThanJustBreakfastCommentOwnership, function(req, res){
    // Find and update the correct comment
    MoreThanJustBreakfastComment.findByIdAndUpdate(req.params.id, req.body.moreThanJustBreakfastComment, function(err, updatedMoreThanJustBreakfastComment){
        if(err){
            res.redirect("/blog/posts/thereIsMoreToItThanJustBreakfast");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/thereIsMoreToItThanJustBreakfast/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkMoreThanJustBreakfastCommentOwnership, function(req, res){
    MoreThanJustBreakfastComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/thereIsMoreToItThanJustBreakfast");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/thereIsMoreToItThanJustBreakfast");
        }
    });
});    

module.exports = router;