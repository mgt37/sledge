var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var LookingForAFlatComment    = require("../../app/models/blog/lookingForAFlatComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    LookingForAFlatComment.find({}, function(err, allLookingForAFlatComments){
        if(err){
            console.log(err);
        } else {
            res.render("blog/what-is-important-to-consider-when-looking-for-a-flat/index", {lookingForAFlatComments: allLookingForAFlatComments});
        }
    });
});

//CREATE - add new comment to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to comments array
    var body   = req.body.body;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newLookingForAFlatComment = ({body: body, author: author});
    //create a new comment and save to DB
    LookingForAFlatComment.create(newLookingForAFlatComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/what-is-important-to-consider-when-looking-for-a-flat");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/what-is-important-to-consider-when-looking-for-a-flat/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    LookingForAFlatComment.findById(req.params.id).populate("lookingForAFlatComments").exec(function(err, foundLookingForAFlatComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/what-is-important-to-consider-when-looking-for-a-flat/show", {lookingForAFlatComment: foundLookingForAFlatComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkLookingForAFlatCommentOwnership, function(req, res){
    LookingForAFlatComment.findById(req.params.id, function(err, foundLookingForAFlatComment){
        if(err){
            res.redirect("/blog/what-is-important-to-consider-when-looking-for-a-flat");
        } else {
            res.render("blog/what-is-important-to-consider-when-looking-for-a-flat/edit", {lookingForAFlatComment: foundLookingForAFlatComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkLookingForAFlatCommentOwnership, function(req, res){
    // Find and update the correct comment
    LookingForAFlatComment.findByIdAndUpdate(req.params.id, req.body.lookingForAFlatComment, function(err, updatedLookingForAFlatComment){
        if(err){
            res.redirect("/blog/what-is-important-to-consider-when-looking-for-a-flat");
        } else {
            // Redirect to show page
            res.redirect("/blog/what-is-important-to-consider-when-looking-for-a-flat/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkLookingForAFlatCommentOwnership, function(req, res){
    LookingForAFlatComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/what-is-important-to-consider-when-looking-for-a-flat");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/what-is-important-to-consider-when-looking-for-a-flat");
        }
    });
});    

module.exports = router;