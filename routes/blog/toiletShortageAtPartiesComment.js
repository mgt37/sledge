var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var ToiletShortageAtPartiesComment    = require("../../app/models/blog/toiletShortageAtPartiesComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    ToiletShortageAtPartiesComment.find({}, function(err, allToiletShortageAtPartiesComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/solvingTheToiletShortageProblemAtParties/index", {toiletShortageAtPartiesComment: allToiletShortageAtPartiesComment});
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
    var newToiletShortageAtPartiesComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    ToiletShortageAtPartiesComment.create(newToiletShortageAtPartiesComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/solvingTheToiletShortageProblemAtParties");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/solvingTheToiletShortageProblemAtParties/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    ToiletShortageAtPartiesComment.findById(req.params.id).populate("comments").exec(function(err, foundToiletShortageAtPartiesComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/solvingTheToiletShortageProblemAtParties/show", {toiletShortageAtPartiesComment: foundToiletShortageAtPartiesComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkToiletShortageAtPartiesCommentOwnership, function(req, res){
    ToiletShortageAtPartiesComment.findById(req.params.id, function(err, foundToiletShortageAtPartiesComment){
        if(err){
            res.redirect("/blog/posts/solvingTheToiletShortageProblemAtParties");
        } else {
            res.render("blog/posts/solvingTheToiletShortageProblemAtParties/edit", {toiletShortageAtPartiesComment: foundToiletShortageAtPartiesComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkToiletShortageAtPartiesCommentOwnership, function(req, res){
    // Find and update the correct comment
    ToiletShortageAtPartiesComment.findByIdAndUpdate(req.params.id, req.body.toiletShortageAtPartiesComment, function(err, updatedToiletShortageAtPartiesComment){
        if(err){
            res.redirect("/blog/posts/solvingTheToiletShortageProblemAtParties");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/solvingTheToiletShortageProblemAtParties/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkToiletShortageAtPartiesCommentOwnership, function(req, res){
    ToiletShortageAtPartiesComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/solvingTheToiletShortageProblemAtParties");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/solvingTheToiletShortageProblemAtParties");
        }
    });
});    

module.exports = router;