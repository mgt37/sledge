var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    HawkesBayRegionAsk       = require("../../app/models/askOffer/hawkesBayRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    HawkesBayRegionAsk.find({}, function(err, allHawkesBayRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/hawkesBayRegion/ask/index", {hawkesBayRegionAsk: allHawkesBayRegionAsk});
        }
    });
});

//CREATE - add new ask to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to ask array
    var title  = req.body.title;
    var body   = req.body.body;
    var hourlyRate = req.body.hourlyRate;
    var contactEmail = req.body.contactEmail;
    var otherContact = req.body.otherContact;
    var author = {
        id: req.user._id,
        username: req.user.local.username || req.user.facebook.name || req.user.twitter.username || req.user.google.name
    };
    var newHawkesBayRegionAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    HawkesBayRegionAsk.create(newHawkesBayRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/hawkesBayRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/hawkesBayRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    HawkesBayRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundHawkesBayRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/hawkesBayRegion/ask/show", {hawkesBayRegionAsk: foundHawkesBayRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkHawkesBayRegionAskOwnership, function(req, res){
    HawkesBayRegionAsk.findById(req.params.id, function(err, foundHawkesBayRegionAsk){
        if(err){
            res.redirect("/askOffer/hawkesBayRegion/ask/index");
        } else {
            res.render("askOffer/hawkesBayRegion/ask/edit", {hawkesBayRegionAsk: foundHawkesBayRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkHawkesBayRegionAskOwnership, function(req, res){
    // Find and update the ask
    HawkesBayRegionAsk.findByIdAndUpdate(req.params.id, req.body.hawkesBayRegionAsk, function(err, updatedHawkesBayRegionAsk){
        if(err){
            res.redirect("/askOffer/hawkesBayRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/hawkesBayRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkHawkesBayRegionAskOwnership, function(req, res){
    HawkesBayRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/hawkesBayRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/hawkesBayRegion/ask");
        }
    });
});

module.exports = router;