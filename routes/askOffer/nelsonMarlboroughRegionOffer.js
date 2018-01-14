var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    NelsonMarlboroughRegionOffer       = require("../../app/models/askOffer/nelsonMarlboroughRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    NelsonMarlboroughRegionOffer.find({}, function(err, allNelsonMarlboroughRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/nelsonMarlboroughRegion/offer/index", {nelsonMarlboroughRegionOffer: allNelsonMarlboroughRegionOffer});
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
    var newNelsonMarlboroughRegionOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    NelsonMarlboroughRegionOffer.create(newNelsonMarlboroughRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/nelsonMarlboroughRegion/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    NelsonMarlboroughRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundNelsonMarlboroughRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/nelsonMarlboroughRegion/offer/show", {nelsonMarlboroughRegionOffer: foundNelsonMarlboroughRegionOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkNelsonMarlboroughRegionOfferOwnership, function(req, res){
    NelsonMarlboroughRegionOffer.findById(req.params.id, function(err, foundNelsonMarlboroughRegionOffer){
        if(err){
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer/index");
        } else {
            res.render("askOffer/nelsonMarlboroughRegion/offer/edit", {nelsonMarlboroughRegionOffer: foundNelsonMarlboroughRegionOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkNelsonMarlboroughRegionOfferOwnership, function(req, res){
    // Find and update the ask
    NelsonMarlboroughRegionOffer.findByIdAndUpdate(req.params.id, req.body.nelsonMarlboroughRegionOffer, function(err, updatedNelsonMarlboroughRegionOffer){
        if(err){
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkNelsonMarlboroughRegionOfferOwnership, function(req, res){
    NelsonMarlboroughRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer");
        }
    });
});

module.exports = router;