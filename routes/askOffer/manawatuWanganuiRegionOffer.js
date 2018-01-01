var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    ManawatuWanganuiRegionOffer       = require("../../app/models/askOffer/manawatuWanganuiRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    ManawatuWanganuiRegionOffer.find({}, function(err, allManawatuWanganuiRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/manawatuWanganuiRegion/offer/index", {manawatuWanganuiRegionOffer: allManawatuWanganuiRegionOffer});
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
    var newManawatuWanganuiRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    ManawatuWanganuiRegionOffer.create(newManawatuWanganuiRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/manawatuWanganuiRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/manawatuWanganuiRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    ManawatuWanganuiRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundManawatuWanganuiRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/manawatuWanganuiRegion/offer/show", {manawatuWanganuiRegionOffer: foundManawatuWanganuiRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkManawatuWanganuiRegionOfferOwnership, function(req, res){
    ManawatuWanganuiRegionOffer.findById(req.params.id, function(err, foundManawatuWanganuiRegionOffer){
        if(err){
            res.redirect("/askOffer/manawatuWanganuiRegion/offer/index");
        } else {
            res.render("askOffer/manawatuWanganuiRegion/offer/edit", {manawatuWanganuiRegionOffer: foundManawatuWanganuiRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkManawatuWanganuiRegionOfferOwnership, function(req, res){
    // Find and update the offer
    ManawatuWanganuiRegionOffer.findByIdAndUpdate(req.params.id, req.body.manawatuWanganuiRegionOffer, function(err, updatedManawatuWanganuiRegionOffer){
        if(err){
            res.redirect("/askOffer/manawatuWanganuiRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/manawatuWanganuiRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkManawatuWanganuiRegionOfferOwnership, function(req, res){
    ManawatuWanganuiRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/manawatuWanganuiRegion/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/manawatuWanganuiRegion/offer");
        }
    });
});

module.exports = router;