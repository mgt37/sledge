var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    CoastalOtagoOffer       = require("../../app/models/askOffer/coastalOtagoOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    CoastalOtagoOffer.find({}, function(err, allCoastalOtagoOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/coastalOtago/offer/index", {coastalOtagoOffer: allCoastalOtagoOffer});
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
    var newCoastalOtagoOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    CoastalOtagoOffer.create(newCoastalOtagoOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/coastalOtago/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/coastalOtago/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    CoastalOtagoOffer.findById(req.params.id).populate("comments").exec(function(err, foundCoastalOtagoOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/coastalOtago/offer/show", {coastalOtagoOffer: foundCoastalOtagoOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkCoastalOtagoOfferOwnership, function(req, res){
    CoastalOtagoOffer.findById(req.params.id, function(err, foundCoastalOtagoOffer){
        if(err){
            res.redirect("/askOffer/coastalOtago/offer/index");
        } else {
            res.render("askOffer/coastalOtago/offer/edit", {coastalOtagoOffer: foundCoastalOtagoOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkCoastalOtagoOfferOwnership, function(req, res){
    // Find and update the ask
    CoastalOtagoOffer.findByIdAndUpdate(req.params.id, req.body.coastalOtagoOffer, function(err, updatedCoastalOtagoOffer){
        if(err){
            res.redirect("/askOffer/coastalOtago/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/coastalOtago/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkCoastalOtagoOfferOwnership, function(req, res){
    CoastalOtagoOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/coastalOtago/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/coastalOtago/offer");
        }
    });
});

module.exports = router;