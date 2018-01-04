var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var PayForDrivingOnATripComment    = require("../../app/models/blog/payForDrivingOnATripComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    PayForDrivingOnATripComment.find({}, function(err, allPayForDrivingOnATripComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/whatIsAFairAmountToPayForDrivingOnATrip/index", {payForDrivingOnATripComment: allPayForDrivingOnATripComment});
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
    var newPayForDrivingOnATripComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    PayForDrivingOnATripComment.create(newPayForDrivingOnATripComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/whatIsAFairAmountToPayForDrivingOnATrip");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/whatIsAFairAmountToPayForDrivingOnATrip/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    PayForDrivingOnATripComment.findById(req.params.id).populate("comments").exec(function(err, foundPayForDrivingOnATripComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/whatIsAFairAmountToPayForDrivingOnATrip/show", {payForDrivingOnATripComment: foundPayForDrivingOnATripComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkPayForDrivingOnATripCommentOwnership, function(req, res){
    PayForDrivingOnATripComment.findById(req.params.id, function(err, foundPayForDrivingOnATripComment){
        if(err){
            res.redirect("/blog/posts/whatIsAFairAmountToPayForDrivingOnATrip");
        } else {
            res.render("blog/posts/whatIsAFairAmountToPayForDrivingOnATrip/edit", {payForDrivingOnATripComment: foundPayForDrivingOnATripComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkPayForDrivingOnATripCommentOwnership, function(req, res){
    // Find and update the correct comment
    PayForDrivingOnATripComment.findByIdAndUpdate(req.params.id, req.body.payForDrivingOnATripComment, function(err, updatedPayForDrivingOnATripComment){
        if(err){
            res.redirect("/blog/posts/whatIsAFairAmountToPayForDrivingOnATrip");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/whatIsAFairAmountToPayForDrivingOnATrip/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkPayForDrivingOnATripCommentOwnership, function(req, res){
    PayForDrivingOnATripComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/whatIsAFairAmountToPayForDrivingOnATrip");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/whatIsAFairAmountToPayForDrivingOnATrip");
        }
    });
});    

module.exports = router;