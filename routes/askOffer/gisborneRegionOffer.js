var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    GisborneRegionOffer       = require("../../app/models/askOffer/gisborneRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    GisborneRegionOffer.find({}, function(err, allGisborneRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/gisborneRegion/offer/index", {gisborneRegionOffer: allGisborneRegionOffer});
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
    var newGisborneRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    GisborneRegionOffer.create(newGisborneRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/gisborneRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/gisborneRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    GisborneRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundGisborneRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/gisborneRegion/offer/show", {gisborneRegionOffer: foundGisborneRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkGisborneRegionOfferOwnership, function(req, res){
    GisborneRegionOffer.findById(req.params.id, function(err, foundGisborneRegionOffer){
        if(err){
            res.redirect("/askOffer/gisborneRegion/offer/index");
        } else {
            res.render("askOffer/gisborneRegion/offer/edit", {gisborneRegionOffer: foundGisborneRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkGisborneRegionOfferOwnership, function(req, res){
    // Find and update the offer
    GisborneRegionOffer.findByIdAndUpdate(req.params.id, req.body.gisborneRegionOffer, function(err, updatedGisborneRegionOffer){
        if(err){
            res.redirect("/askOffer/gisborneRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/gisborneRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkGisborneRegionOfferOwnership, function(req, res){
    GisborneRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/gisborneRegion/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/gisborneRegion/offer");
        }
    });
});

module.exports = router;