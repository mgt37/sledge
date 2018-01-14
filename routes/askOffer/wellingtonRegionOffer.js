var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WellingtonRegionOffer       = require("../../app/models/askOffer/wellingtonRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    WellingtonRegionOffer.find({}, function(err, allWellingtonRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/wellingtonRegion/offer/index", {wellingtonRegionOffer: allWellingtonRegionOffer});
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
    var newWellingtonRegionOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    WellingtonRegionOffer.create(newWellingtonRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/wellingtonRegion/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/wellingtonRegion/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    WellingtonRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundWellingtonRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/wellingtonRegion/offer/show", {wellingtonRegionOffer: foundWellingtonRegionOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkWellingtonRegionOfferOwnership, function(req, res){
    WellingtonRegionOffer.findById(req.params.id, function(err, foundWellingtonRegionOffer){
        if(err){
            res.redirect("/askOffer/wellingtonRegion/offer/index");
        } else {
            res.render("askOffer/wellingtonRegion/offer/edit", {wellingtonRegionOffer: foundWellingtonRegionOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkWellingtonRegionOfferOwnership, function(req, res){
    // Find and update the ask
    WellingtonRegionOffer.findByIdAndUpdate(req.params.id, req.body.wellingtonRegionOffer, function(err, updatedWellingtonRegionOffer){
        if(err){
            res.redirect("/askOffer/wellingtonRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/wellingtonRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWellingtonRegionOfferOwnership, function(req, res){
    WellingtonRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/wellingtonRegion/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/wellingtonRegion/offer");
        }
    });
});

module.exports = router;