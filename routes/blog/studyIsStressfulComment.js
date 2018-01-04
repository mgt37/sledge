var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var StudyIsStressfulComment    = require("../../app/models/blog/studyIsStressfulComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    StudyIsStressfulComment.find({}, function(err, allStudyIsStressfulComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/studyIsStressfulFindWaysToManageIt/index", {studyIsStressfulComment: allStudyIsStressfulComment});
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
    var newStudyIsStressfulComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    StudyIsStressfulComment.create(newStudyIsStressfulComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/studyIsStressfulFindWaysToManageIt");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/studyIsStressfulFindWaysToManageIt/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    StudyIsStressfulComment.findById(req.params.id).populate("comments").exec(function(err, foundStudyIsStressfulComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/studyIsStressfulFindWaysToManageIt/show", {studyIsStressfulComment: foundStudyIsStressfulComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkStudyIsStressfulCommentOwnership, function(req, res){
    StudyIsStressfulComment.findById(req.params.id, function(err, foundStudyIsStressfulComment){
        if(err){
            res.redirect("/blog/posts/studyIsStressfulFindWaysToManageIt");
        } else {
            res.render("blog/posts/studyIsStressfulFindWaysToManageIt/edit", {studyIsStressfulComment: foundStudyIsStressfulComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkStudyIsStressfulCommentOwnership, function(req, res){
    // Find and update the correct comment
    StudyIsStressfulComment.findByIdAndUpdate(req.params.id, req.body.studyIsStressfulComment, function(err, updatedStudyIsStressfulComment){
        if(err){
            res.redirect("/blog/posts/studyIsStressfulFindWaysToManageIt");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/studyIsStressfulFindWaysToManageIt/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkStudyIsStressfulCommentOwnership, function(req, res){
    StudyIsStressfulComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/studyIsStressfulFindWaysToManageIt");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/studyIsStressfulFindWaysToManageIt");
        }
    });
});    

module.exports = router;