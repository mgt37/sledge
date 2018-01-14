var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    Career            = require("../../app/models/uniTalk/career"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    // Get all uniTalk from DB
    Career.find({}, function(err, allCareers){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/career/index", {careers: allCareers});
        }
    });
});

//CREATE - add new uniTalk topic to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to uniTalk topics array
    var title  = req.body.title;
    var body   = req.body.body;
    var image  = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.local.username || req.user.facebook.name || req.user.twitter.username || req.user.google.name 
    };
    var newCareer = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    Career.create(newCareer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/career");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/career/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Career.findById(req.params.id).populate("comments").exec(function(err, foundCareer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/career/show", {career: foundCareer});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkCareerOwnership, function(req, res){
    Career.findById(req.params.id, function(err, foundCareer){
        if(err){
            res.redirect("/uniTalk/career");
        } else {
            res.render("uniTalk/career/edit", {career: foundCareer});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkCareerOwnership, function(req, res){
    // Find and update the correct topic
    Career.findByIdAndUpdate(req.params.id, req.body.career, function(err, updatedCareer){
        if(err){
            res.redirect("/uniTalk/career");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/career/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkCareerOwnership, function(req, res){
    Career.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/career");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/career");
        }
    });
});

module.exports = router;