var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var FindYourFlawsComment    = require("../../app/models/blog/findYourFlawsComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    FindYourFlawsComment.find({}, function(err, allFindYourFlawsComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/findYourFlawsAndLearnToImproveOnThem/index", {findYourFlawsComment: allFindYourFlawsComment});
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
    var newFindYourFlawsComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    FindYourFlawsComment.create(newFindYourFlawsComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/findYourFlawsAndLearnToImproveOnThem");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/findYourFlawsAndLearnToImproveOnThem/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    FindYourFlawsComment.findById(req.params.id).populate("comments").exec(function(err, foundFindYourFlawsComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/findYourFlawsAndLearnToImproveOnThem/show", {findYourFlawsComment: foundFindYourFlawsComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkFindYourFlawsCommentOwnership, function(req, res){
    FindYourFlawsComment.findById(req.params.id, function(err, foundFindYourFlawsComment){
        if(err){
            res.redirect("/blog/posts/findYourFlawsAndLearnToImproveOnThem");
        } else {
            res.render("blog/posts/findYourFlawsAndLearnToImproveOnThem/edit", {findYourFlawsComment: foundFindYourFlawsComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkFindYourFlawsCommentOwnership, function(req, res){
    // Find and update the correct comment
    FindYourFlawsComment.findByIdAndUpdate(req.params.id, req.body.findYourFlawsComment, function(err, updatedFindYourFlawsComment){
        if(err){
            res.redirect("/blog/posts/findYourFlawsAndLearnToImproveOnThem");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/findYourFlawsAndLearnToImproveOnThem/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkFindYourFlawsCommentOwnership, function(req, res){
    FindYourFlawsComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/findYourFlawsAndLearnToImproveOnThem");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/findYourFlawsAndLearnToImproveOnThem");
        }
    });
});    

module.exports = router;