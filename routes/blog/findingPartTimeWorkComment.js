var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var FindingPartTimeWorkComment    = require("../../app/models/blog/findingPartTimeWorkComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    FindingPartTimeWorkComment.find({}, function(err, allFindingPartTimeWorkComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/whatIdeasAreThereForFindingPartTimeWork/index", {findingPartTimeWorkComment: allFindingPartTimeWorkComment});
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
    var newFindingPartTimeWorkComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    FindingPartTimeWorkComment.create(newFindingPartTimeWorkComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/whatIdeasAreThereForFindingPartTimeWork");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/whatIdeasAreThereForFindingPartTimeWork/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    FindingPartTimeWorkComment.findById(req.params.id).populate("comments").exec(function(err, foundFindingPartTimeWorkComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/whatIdeasAreThereForFindingPartTimeWork/show", {findingPartTimeWorkComment: foundFindingPartTimeWorkComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkFindingPartTimeWorkCommentOwnership, function(req, res){
    FindingPartTimeWorkComment.findById(req.params.id, function(err, foundFindingPartTimeWorkComment){
        if(err){
            res.redirect("/blog/posts/whatIdeasAreThereForFindingPartTimeWork");
        } else {
            res.render("blog/posts/whatIdeasAreThereForFindingPartTimeWork/edit", {findingPartTimeWorkComment: foundFindingPartTimeWorkComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkFindingPartTimeWorkCommentOwnership, function(req, res){
    // Find and update the correct comment
    FindingPartTimeWorkComment.findByIdAndUpdate(req.params.id, req.body.findingPartTimeWorkComment, function(err, updatedFindingPartTimeWorkComment){
        if(err){
            res.redirect("/blog/posts/whatIdeasAreThereForFindingPartTimeWork");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/whatIdeasAreThereForFindingPartTimeWork/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkFindingPartTimeWorkCommentOwnership, function(req, res){
    FindingPartTimeWorkComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/whatIdeasAreThereForFindingPartTimeWork");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/whatIdeasAreThereForFindingPartTimeWork");
        }
    });
});    

module.exports = router;