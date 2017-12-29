var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    Alcohol            = require("../../app/models/uniTalk/alcohol"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    // Get all uniTalk from DB
    Alcohol.find({}, function(err, allAlcohol){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/alcohol/index", {alcohol: allAlcohol});
        }
    });
});

//CREATE - add new uniTalk topic to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to uniTalk topics array
    var title  = req.body.title;
    var body   = req.body.body;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newAlcohol = ({title: title, body: body, author: author});
    //create a new uniTalk topic and save to DB
    Alcohol.create(newAlcohol, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/alcohol");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/alcohol/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Alcohol.findById(req.params.id).populate("comments").exec(function(err, foundAlcohol){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/alcohol/show", {alcohol: foundAlcohol});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkAlcoholOwnership, function(req, res){
    Alcohol.findById(req.params.id, function(err, foundAlcohol){
        if(err){
            res.redirect("/uniTalk/alcohol");
        } else {
            res.render("uniTalk/alcohol/edit", {alcohol: foundAlcohol});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkAlcoholOwnership, function(req, res){
    // Find and update the correct topic
    Alcohol.findByIdAndUpdate(req.params.id, req.body.alcohol, function(err, updatedAlcohol){
        if(err){
            res.redirect("/uniTalk/alcohol");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/alcohol/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkAlcoholOwnership, function(req, res){
    Alcohol.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/alcohol");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/alcohol");
        }
    });
});

module.exports = router;