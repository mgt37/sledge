var express    = require("express");
var router     = express.Router();
var Topic      = require("../app/models/topic");
var middleware = require("../middleware");

//INDEX - Show all topics
router.get("/", function(req, res){
    // Get all topics from DB
    Topic.find({}, function(err, allTopics){
        if(err){
            console.log(err);
        } else {
            res.render("topics/index", {topics: allTopics});
        }
    });
});

//CREATE - add new topic to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to topics array
    var title   = req.body.title;
    var image  = req.body.image;
    var body   = req.body.body;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newTopic = ({title: title, image: image, body: body, author: author});
    //create a new topic and save to DB
    Topic.create(newTopic, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to topics page
            res.redirect("/topics");
        }
    });
});

//NEW - Show form to create new topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("topics/new");
});

//SHOW - Shows more information about one topic
router.get("/:id", function(req, res){
    //Find the topic with provided ID
    Topic.findById(req.params.id).populate("comments").exec(function(err, foundTopic){
        if(err){
            console.log(err);
        } else {
            //Render show template with that topic
            res.render("topics/show", {topic: foundTopic});    
        }
    });
});

// EDIT Topic Route
router.get("/:id/edit", middleware.checkTopicOwnership, function(req, res){
    Topic.findById(req.params.id, function(err, foundTopic){
        if(err){
            res.redirect("/topics");
        } else {
            res.render("topics/edit", {topic: foundTopic});
        }
    });
});

// UPDATE Topic Route
router.put("/:id", middleware.checkTopicOwnership, function(req, res){
    // Find and update the correct topic
    Topic.findByIdAndUpdate(req.params.id, req.body.topic, function(err, updatedTopic){
        if(err){
            res.redirect("/topics");
        } else {
            // Redirect to show page
            res.redirect("/topics/" + req.params.id);
        }
    });
});

// DESTROY Topic Route
router.delete("/:id", middleware.checkTopicOwnership, function(req, res){
    Topic.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/topics");
        } else {
            req.flash("success", "Topic deleted");
            res.redirect("/topics");
        }
    });
});


module.exports = router;