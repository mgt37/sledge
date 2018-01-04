var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var WhereYouAreInLifeComment    = require("../../app/models/blog/whereYouAreInLifeComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    WhereYouAreInLifeComment.find({}, function(err, allWhereYouAreInLifeComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/whereYouAreInLifeRightNowIsJustFine/index", {whereYouAreInLifeComment: allWhereYouAreInLifeComment});
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
    var newWhereYouAreInLifeComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    WhereYouAreInLifeComment.create(newWhereYouAreInLifeComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/whereYouAreInLifeRightNowIsJustFine");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/whereYouAreInLifeRightNowIsJustFine/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    WhereYouAreInLifeComment.findById(req.params.id).populate("comments").exec(function(err, foundWhereYouAreInLifeComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/whereYouAreInLifeRightNowIsJustFine/show", {whereYouAreInLifeComment: foundWhereYouAreInLifeComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkWhereYouAreInLifeCommentOwnership, function(req, res){
    WhereYouAreInLifeComment.findById(req.params.id, function(err, foundWhereYouAreInLifeComment){
        if(err){
            res.redirect("/blog/posts/whereYouAreInLifeRightNowIsJustFine");
        } else {
            res.render("blog/posts/whereYouAreInLifeRightNowIsJustFine/edit", {whereYouAreInLifeComment: foundWhereYouAreInLifeComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkWhereYouAreInLifeCommentOwnership, function(req, res){
    // Find and update the correct comment
    WhereYouAreInLifeComment.findByIdAndUpdate(req.params.id, req.body.whereYouAreInLifeComment, function(err, updatedWhereYouAreInLifeComment){
        if(err){
            res.redirect("/blog/posts/whereYouAreInLifeRightNowIsJustFine");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/whereYouAreInLifeRightNowIsJustFine/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkWhereYouAreInLifeCommentOwnership, function(req, res){
    WhereYouAreInLifeComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/whereYouAreInLifeRightNowIsJustFine");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/whereYouAreInLifeRightNowIsJustFine");
        }
    });
});    

module.exports = router;