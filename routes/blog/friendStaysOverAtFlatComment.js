var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var FriendStaysOverAtFlatComment    = require("../../app/models/blog/friendStaysOverAtFlatComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    FriendStaysOverAtFlatComment.find({}, function(err, allFriendStaysOverAtFlatComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat/index", {friendStaysOverAtFlatComment: allFriendStaysOverAtFlatComment});
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
    var newFriendStaysOverAtFlatComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    FriendStaysOverAtFlatComment.create(newFriendStaysOverAtFlatComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    FriendStaysOverAtFlatComment.findById(req.params.id).populate("comments").exec(function(err, foundFriendStaysOverAtFlatComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat/show", {friendStaysOverAtFlatComment: foundFriendStaysOverAtFlatComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkFriendStaysOverAtFlatCommentOwnership, function(req, res){
    FriendStaysOverAtFlatComment.findById(req.params.id, function(err, foundFriendStaysOverAtFlatComment){
        if(err){
            res.redirect("/blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat");
        } else {
            res.render("blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat/edit", {friendStaysOverAtFlatComment: foundFriendStaysOverAtFlatComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkFriendStaysOverAtFlatCommentOwnership, function(req, res){
    // Find and update the correct comment
    FriendStaysOverAtFlatComment.findByIdAndUpdate(req.params.id, req.body.friendStaysOverAtFlatComment, function(err, updatedFriendStaysOverAtFlatComment){
        if(err){
            res.redirect("/blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkFriendStaysOverAtFlatCommentOwnership, function(req, res){
    FriendStaysOverAtFlatComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/whatToConsiderWhenAFriendStaysOverAtYourFlat");
        }
    });
});    

module.exports = router;