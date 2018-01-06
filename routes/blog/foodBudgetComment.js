var express           = require("express");
var router            = express();
var timestamp                   = require('time-stamp');
var FoodBudgetComment    = require("../../app/models/blog/foodBudgetComment");
var middleware                  = require("../../middleware"),
blogMiddleware                  = require("../../middleware/blog");

//INDEX
router.get("/", function(req, res){
    // Get all comments from DB
    FoodBudgetComment.find({}, function(err, allFoodBudgetComment){
        if(err){
            console.log(err);
        } else {
            res.render("blog/posts/foodBudget/index", {foodBudgetComment: allFoodBudgetComment});
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
    var newFoodBudgetComment = ({blogComment: blogComment, author: author});
    //create a comment and save to DB
    FoodBudgetComment.create(newFoodBudgetComment, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to index page
            res.redirect("/blog/posts/foodBudget");
        }
    });
});

//NEW - Show form to create new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blog/posts/foodBudget/new");
});

//SHOW - Shows more information about one comment
router.get("/:id", function(req, res){
    //Find the comment with provided ID
    FoodBudgetComment.findById(req.params.id).populate("comments").exec(function(err, foundFoodBudgetComment){
        if(err){
            console.log(err);
        } else {
            //Render show template with that comment
            res.render("blog/posts/foodBudget/show", {foodBudgetComment: foundFoodBudgetComment});    
        }
    });    
});

// EDIT comment Route
router.get("/:id/edit", blogMiddleware.checkFoodBudgetCommentOwnership, function(req, res){
    FoodBudgetComment.findById(req.params.id, function(err, foundFoodBudgetComment){
        if(err){
            res.redirect("/blog/posts/foodBudget");
        } else {
            res.render("blog/posts/foodBudget/edit", {foodBudgetComment: foundFoodBudgetComment});
        }
    });
});

// UPDATE comment Route
router.put("/:id", blogMiddleware.checkFoodBudgetCommentOwnership, function(req, res){
    // Find and update the correct comment
    FoodBudgetComment.findByIdAndUpdate(req.params.id, req.body.foodBudgetComment, function(err, updatedFoodBudgetComment){
        if(err){
            res.redirect("/blog/posts/foodBudget");
        } else {
            // Redirect to show page
            res.redirect("/blog/posts/foodBudget/" + req.params.id);
        }
    });
});

// DESTROY comment Route
router.delete("/:id", blogMiddleware.checkFoodBudgetCommentOwnership, function(req, res){
    FoodBudgetComment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog/posts/foodBudget");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/blog/posts/foodBudget");
        }
    });
});    

module.exports = router;