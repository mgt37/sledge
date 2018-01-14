var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    NorthlandRegionOffer       = require("../../app/models/askOffer/northlandRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    NorthlandRegionOffer.find({}, function(err, allNorthlandRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/northlandRegion/offer/index", {northlandRegionOffer: allNorthlandRegionOffer});
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
    var newNorthlandRegionOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    NorthlandRegionOffer.create(newNorthlandRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/northlandRegion/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/northlandRegion/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    NorthlandRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundNorthlandRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/northlandRegion/offer/show", {northlandRegionOffer: foundNorthlandRegionOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkNorthlandRegionOfferOwnership, function(req, res){
    NorthlandRegionOffer.findById(req.params.id, function(err, foundNorthlandRegionOffer){
        if(err){
            res.redirect("/askOffer/northlandRegion/offer/index");
        } else {
            res.render("askOffer/northlandRegion/offer/edit", {northlandRegionOffer: foundNorthlandRegionOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkNorthlandRegionOfferOwnership, function(req, res){
    // Find and update the ask
    NorthlandRegionOffer.findByIdAndUpdate(req.params.id, req.body.northlandRegionOffer, function(err, updatedNorthlandRegionOffer){
        if(err){
            res.redirect("/askOffer/northlandRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/northlandRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkNorthlandRegionOfferOwnership, function(req, res){
    NorthlandRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/northlandRegion/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/northlandRegion/offer");
        }
    });
});

module.exports = router;