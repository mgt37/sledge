var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    HamiltonOffer       = require("../../app/models/askOffer/hamiltonOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    HamiltonOffer.find({}, function(err, allHamiltonOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/hamilton/offer/index", {hamiltonOffer: allHamiltonOffer});
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
    var newHamiltonOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    HamiltonOffer.create(newHamiltonOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/hamilton/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/hamilton/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    HamiltonOffer.findById(req.params.id).populate("comments").exec(function(err, foundHamiltonOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/hamilton/offer/show", {hamiltonOffer: foundHamiltonOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkHamiltonOfferOwnership, function(req, res){
    HamiltonOffer.findById(req.params.id, function(err, foundHamiltonOffer){
        if(err){
            res.redirect("/askOffer/hamilton/offer/index");
        } else {
            res.render("askOffer/hamilton/offer/edit", {hamiltonOffer: foundHamiltonOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkHamiltonOfferOwnership, function(req, res){
    // Find and update the ask
    HamiltonOffer.findByIdAndUpdate(req.params.id, req.body.hamiltonOffer, function(err, updatedHamiltonOffer){
        if(err){
            res.redirect("/askOffer/hamilton/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/hamilton/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkHamiltonOfferOwnership, function(req, res){
    HamiltonOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/hamilton/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/hamilton/offer");
        }
    });
});

module.exports = router;