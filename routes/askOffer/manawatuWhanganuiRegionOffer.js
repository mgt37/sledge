var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    ManawatuWhanganuiRegionOffer       = require("../../app/models/askOffer/manawatuWhanganuiRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    ManawatuWhanganuiRegionOffer.find({}, function(err, allManawatuWhanganuiRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/manawatuWhanganuiRegion/offer/index", {manawatuWhanganuiRegionOffer: allManawatuWhanganuiRegionOffer});
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
    var newManawatuWhanganuiRegionOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    ManawatuWhanganuiRegionOffer.create(newManawatuWhanganuiRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/manawatuWhanganuiRegion/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/manawatuWhanganuiRegion/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    ManawatuWhanganuiRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundManawatuWhanganuiRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/manawatuWhanganuiRegion/offer/show", {manawatuWhanganuiRegionOffer: foundManawatuWhanganuiRegionOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkManawatuWhanganuiRegionOfferOwnership, function(req, res){
    ManawatuWhanganuiRegionOffer.findById(req.params.id, function(err, foundManawatuWhanganuiRegionOffer){
        if(err){
            res.redirect("/askOffer/manawatuWhanganuiRegion/offer/index");
        } else {
            res.render("askOffer/manawatuWhanganuiRegion/offer/edit", {manawatuWhanganuiRegionOffer: foundManawatuWhanganuiRegionOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkManawatuWhanganuiRegionOfferOwnership, function(req, res){
    // Find and update the ask
    ManawatuWhanganuiRegionOffer.findByIdAndUpdate(req.params.id, req.body.manawatuWhanganuiRegionOffer, function(err, updatedManawatuWhanganuiRegionOffer){
        if(err){
            res.redirect("/askOffer/manawatuWhanganuiRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/manawatuWhanganuiRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkManawatuWhanganuiRegionOfferOwnership, function(req, res){
    ManawatuWhanganuiRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/manawatuWhanganuiRegion/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/manawatuWhanganuiRegion/offer");
        }
    });
});

module.exports = router;