var express                     = require("express");
var router                      = express.Router({mergeParams: true});
var timestamp                   = require('time-stamp');
var HayfeverTreatmentComment    = require("../../app/models/blog/hayfeverTreatmentComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    HayfeverTreatmentComment.find({}, function(err, allHayfeverTreatmentComments){
        if(err){
            console.log(err);
        } else {
            res.render("blog/hayfever-treatment-on-a-budget/index", {hayfeverTreatmentComments: allHayfeverTreatmentComments});
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
    var newHayfeverTreatmentComment = ({body: body, author: author});
    //create a comment and save to DB
    HayfeverTreatmentComment.create(newHayfeverTreatmentComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/hayfever-treatment-on-a-budget");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/hayfever-treatment-on-a-budget/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    HayfeverTreatmentComment.findById(req.params.id).populate("hayfeverTreatmentComments").exec(function(err, foundHayfeverTreatmentComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/hayfever-treatment-on-a-budget/show", {hayfeverTreatmentComment: foundHayfeverTreatmentComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkHayfeverTreatmentCommentOwnership, function(req, res){
    HayfeverTreatmentComment.findById(req.params.id, function(err, foundHayfeverTreatmentComment){
        if(err){
            res.redirect("/blog/hayfever-treatment-on-a-budget");
        } else {
            res.render("blog/hayfever-treatment-on-a-budget/edit", {hayfeverTreatmentComment: foundHayfeverTreatmentComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkHayfeverTreatmentCommentOwnership, function(req, res){
    // Find and update the correct comment
    HayfeverTreatmentComment.findByIdAndUpdate(req.params.id, req.body.hayfeverTreatmentComment, function(err, updatedHayfeverTreatmentComment){
        if(err){
            res.redirect("/blog/hayfever-treatment-on-a-budget");
        } else {
            // Redirect to show page
            res.redirect("/blog/hayfever-treatment-on-a-budget/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkHayfeverTreatmentCommentOwnership, function(req, res){
    HayfeverTreatmentComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/hayfever-treatment-on-a-budget");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/hayfever-treatment-on-a-budget");
        }
    });
});    

module.exports = router;