var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WellingtonOffer       = require("../../app/models/askOffer/wellingtonOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    WellingtonOffer.find({}, function(err, allWellingtonOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/wellington/offer/index", {wellingtonOffer: allWellingtonOffer});
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
    var newWellingtonOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    WellingtonOffer.create(newWellingtonOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/wellington/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/wellington/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    WellingtonOffer.findById(req.params.id).populate("comments").exec(function(err, foundWellingtonOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/wellington/offer/show", {wellingtonOffer: foundWellingtonOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkWellingtonOfferOwnership, function(req, res){
    WellingtonOffer.findById(req.params.id, function(err, foundWellingtonOffer){
        if(err){
            res.redirect("/askOffer/wellington/offer/index");
        } else {
            res.render("askOffer/wellington/offer/edit", {wellingtonOffer: foundWellingtonOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkWellingtonOfferOwnership, function(req, res){
    // Find and update the ask
    WellingtonOffer.findByIdAndUpdate(req.params.id, req.body.wellingtonOffer, function(err, updatedWellingtonOffer){
        if(err){
            res.redirect("/askOffer/wellington/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/wellington/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWellingtonOfferOwnership, function(req, res){
    WellingtonOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/wellington/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/wellington/offer");
        }
    });
});

module.exports = router;