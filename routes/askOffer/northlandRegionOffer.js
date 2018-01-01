var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    NorthlandRegionOffer       = require("../../app/models/askOffer/northlandRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    NorthlandRegionOffer.find({}, function(err, allNorthlandRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/northlandRegion/offer/index", {northlandRegionOffer: allNorthlandRegionOffer});
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
    var newNorthlandRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    NorthlandRegionOffer.create(newNorthlandRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/northlandRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/northlandRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    NorthlandRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundNorthlandRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/northlandRegion/offer/show", {northlandRegionOffer: foundNorthlandRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkNorthlandRegionOfferOwnership, function(req, res){
    NorthlandRegionOffer.findById(req.params.id, function(err, foundNorthlandRegionOffer){
        if(err){
            res.redirect("/askOffer/northlandRegion/offer/index");
        } else {
            res.render("askOffer/northlandRegion/offer/edit", {northlandRegionOffer: foundNorthlandRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkNorthlandRegionOfferOwnership, function(req, res){
    // Find and update the offer
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
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/northlandRegion/offer");
        }
    });
});

module.exports = router;