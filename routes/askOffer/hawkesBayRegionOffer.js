var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    HawkesBayRegionOffer       = require("../../app/models/askOffer/hawkesBayRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    HawkesBayRegionOffer.find({}, function(err, allHawkesBayRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/hawkesBayRegion/offer/index", {hawkesBayRegionOffer: allHawkesBayRegionOffer});
        }
    });
});

//CREATE - add new offer to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to offer array
    var title  = req.body.title;
    var body   = req.body.body;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newHawkesBayRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    HawkesBayRegionOffer.create(newHawkesBayRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/hawkesBayRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/hawkesBayRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    HawkesBayRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundHawkesBayRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/hawkesBayRegion/offer/show", {hawkesBayRegionOffer: foundHawkesBayRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkHawkesBayRegionOfferOwnership, function(req, res){
    HawkesBayRegionOffer.findById(req.params.id, function(err, foundHawkesBayRegionOffer){
        if(err){
            res.redirect("/askOffer/hawkesBayRegion/offer/index");
        } else {
            res.render("askOffer/hawkesBayRegion/offer/edit", {hawkesBayRegionOffer: foundHawkesBayRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkHawkesBayRegionOfferOwnership, function(req, res){
    // Find and update the offer
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
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/hawkesBayRegion/offer");
        }
    });
});

module.exports = router;