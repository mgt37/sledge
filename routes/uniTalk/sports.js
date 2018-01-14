var express           = require("express"),
    router            = express(),
    Sport             = require("../../app/models/uniTalk/sport"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    // Get all uniTalk from DB
    Sport.find({}, function(err, allSports){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/sport/index", {sports: allSports});
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
        username:  req.user.local.username || req.user.facebook.name || req.user.twitter.username || req.user.google.name
    };
    var newSport = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    Sport.create(newSport, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/sport");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/sport/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Sport.findById(req.params.id).populate("comments").exec(function(err, foundSport){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/sport/show", {sport: foundSport});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkSportOwnership, function(req, res){
    Sport.findById(req.params.id, function(err, foundSport){
        if(err){
            res.redirect("/uniTalk/sport");
        } else {
            res.render("uniTalk/sport/edit", {sport: foundSport});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkSportOwnership, function(req, res){
    // Find and update the correct topic
    Sport.findByIdAndUpdate(req.params.id, req.body.sport, function(err, updatedSport){
        if(err){
            res.redirect("/uniTalk/sport");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/sport/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkSportOwnership, function(req, res){
    Sport.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/sport");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/sport");
        }
    });
});

module.exports = router;