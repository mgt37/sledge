var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    SouthlandRegionOffer       = require("../../app/models/askOffer/southlandRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    SouthlandRegionOffer.find({}, function(err, allSouthlandRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/southlandRegion/offer/index", {southlandRegionOffer: allSouthlandRegionOffer});
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
    var newSouthlandRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    SouthlandRegionOffer.create(newSouthlandRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/southlandRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/southlandRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    SouthlandRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundSouthlandRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/southlandRegion/offer/show", {southlandRegionOffer: foundSouthlandRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkSouthlandRegionOfferOwnership, function(req, res){
    SouthlandRegionOffer.findById(req.params.id, function(err, foundSouthlandRegionOffer){
        if(err){
            res.redirect("/askOffer/southlandRegion/offer/index");
        } else {
            res.render("askOffer/southlandRegion/offer/edit", {southlandRegionOffer: foundSouthlandRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkSouthlandRegionOfferOwnership, function(req, res){
    // Find and update the offer
    SouthlandRegionOffer.findByIdAndUpdate(req.params.id, req.body.southlandRegionOffer, function(err, updatedSouthlandRegionOffer){
        if(err){
            res.redirect("/askOffer/southlandRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/southlandRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkSouthlandRegionOfferOwnership, function(req, res){
    SouthlandRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/southlandRegion/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/southlandRegion/offer");
        }
    });
});

module.exports = router;