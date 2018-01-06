var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var PartyIdeasComment    = require("../../app/models/blog/partyIdeasComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    PartyIdeasComment.find({}, function(err, allPartyIdeasComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/ideasForYourNextParty/index", {partyIdeasComment: allPartyIdeasComment});
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
    var newPartyIdeasComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    PartyIdeasComment.create(newPartyIdeasComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/ideasForYourNextParty");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/ideasForYourNextParty/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    PartyIdeasComment.findById(req.params.id).populate("comments").exec(function(err, foundPartyIdeasComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/ideasForYourNextParty/show", {partyIdeasComment: foundPartyIdeasComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkPartyIdeasCommentOwnership, function(req, res){
    PartyIdeasComment.findById(req.params.id, function(err, foundPartyIdeasComment){
        if(err){
            res.redirect("/blog/posts/ideasForYourNextParty");
        } else {
            res.render("blog/posts/ideasForYourNextParty/edit", {partyIdeasComment: foundPartyIdeasComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkPartyIdeasCommentOwnership, function(req, res){
    // Find and update the correct comment
    PartyIdeasComment.findByIdAndUpdate(req.params.id, req.body.partyIdeasComment, function(err, updatedPartyIdeasComment){
        if(err){
            res.redirect("/blog/posts/ideasForYourNextParty");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/ideasForYourNextParty/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkPartyIdeasCommentOwnership, function(req, res){
    PartyIdeasComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/ideasForYourNextParty");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/ideasForYourNextParty");
        }
    });
});    

module.exports = router;