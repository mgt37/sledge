var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    HawkesBayRegionOffer       = require("../../app/models/askOffer/hawkesBayRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    HawkesBayRegionOffer.find({}, function(err, allHawkesBayRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/hawkesBayRegion/offer/index", {hawkesBayRegionOffer: allHawkesBayRegionOffer});
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
    var newHawkesBayRegionOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    HawkesBayRegionOffer.create(newHawkesBayRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/hawkesBayRegion/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/hawkesBayRegion/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    HawkesBayRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundHawkesBayRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/hawkesBayRegion/offer/show", {hawkesBayRegionOffer: foundHawkesBayRegionOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkHawkesBayRegionOfferOwnership, function(req, res){
    HawkesBayRegionOffer.findById(req.params.id, function(err, foundHawkesBayRegionOffer){
        if(err){
            res.redirect("/askOffer/hawkesBayRegion/offer/index");
        } else {
            res.render("askOffer/hawkesBayRegion/offer/edit", {hawkesBayRegionOffer: foundHawkesBayRegionOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkHawkesBayRegionOfferOwnership, function(req, res){
    // Find and update the ask
    HawkesBayRegionOffer.findByIdAndUpdate(req.params.id, req.body.hawkesBayRegionOffer, function(err, updatedHawkesBayRegionOffer){
        if(err){
            res.redirect("/askOffer/hawkesBayRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/hawkesBayRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkHawkesBayRegionOfferOwnership, function(req, res){
    HawkesBayRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/hawkesBayRegion/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/hawkesBayRegion/offer");
        }
    });
});

module.exports = router;