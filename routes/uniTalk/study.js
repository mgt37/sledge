var express           = require("express"),
    router            = express(),
    Study            = require("../../app/models/uniTalk/study"),
    middleware        = require("../../middleware"),
    uniTalkmiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    // Get all uniTalk from DB
    Study.find({}, function(err, allStudy){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/study/index", {study: allStudy});
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
    var newStudy = ({title: title, body: body, author: author});
    //create a new uniTalk topic and save to DB
    Study.create(newStudy, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/study");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/study/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Study.findById(req.params.id).populate("comments").exec(function(err, foundStudy){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/study/show", {study: foundStudy});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkmiddleware.checkStudyOwnership, function(req, res){
    Study.findById(req.params.id, function(err, foundStudy){
        if(err){
            res.redirect("/uniTalk/study");
        } else {
            res.render("uniTalk/study/edit", {study: foundStudy});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkmiddleware.checkStudyOwnership, function(req, res){
    // Find and update the correct topic
    Study.findByIdAndUpdate(req.params.id, req.body.study, function(err, updatedStudy){
        if(err){
            res.redirect("/uniTalk/study");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/study/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkmiddleware.checkStudyOwnership, function(req, res){
    Study.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/study");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/study");
        }
    });
});

module.exports = router;