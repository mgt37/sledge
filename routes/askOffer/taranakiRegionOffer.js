var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    TaranakiRegionOffer       = require("../../app/models/askOffer/taranakiRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    TaranakiRegionOffer.find({}, function(err, allTaranakiRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/taranakiRegion/offer/index", {taranakiRegionOffer: allTaranakiRegionOffer});
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
    var newTaranakiRegionOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    TaranakiRegionOffer.create(newTaranakiRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/taranakiRegion/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/taranakiRegion/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    TaranakiRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundTaranakiRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/taranakiRegion/offer/show", {taranakiRegionOffer: foundTaranakiRegionOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkTaranakiRegionOfferOwnership, function(req, res){
    TaranakiRegionOffer.findById(req.params.id, function(err, foundTaranakiRegionOffer){
        if(err){
            res.redirect("/askOffer/taranakiRegion/offer/index");
        } else {
            res.render("askOffer/taranakiRegion/offer/edit", {taranakiRegionOffer: foundTaranakiRegionOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkTaranakiRegionOfferOwnership, function(req, res){
    // Find and update the ask
    TaranakiRegionOffer.findByIdAndUpdate(req.params.id, req.body.taranakiRegionOffer, function(err, updatedTaranakiRegionOffer){
        if(err){
            res.redirect("/askOffer/taranakiRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/taranakiRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkTaranakiRegionOfferOwnership, function(req, res){
    TaranakiRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/taranakiRegion/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/taranakiRegion/offer");
        }
    });
});

module.exports = router;