var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    TaranakiRegionOffer       = require("../../app/models/askOffer/taranakiRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    TaranakiRegionOffer.find({}, function(err, allTaranakiRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/taranakiRegion/offer/index", {taranakiRegionOffer: allTaranakiRegionOffer});
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
    var newTaranakiRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    TaranakiRegionOffer.create(newTaranakiRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/taranakiRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/taranakiRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    TaranakiRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundTaranakiRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/taranakiRegion/offer/show", {taranakiRegionOffer: foundTaranakiRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkTaranakiRegionOfferOwnership, function(req, res){
    TaranakiRegionOffer.findById(req.params.id, function(err, foundTaranakiRegionOffer){
        if(err){
            res.redirect("/askOffer/taranakiRegion/offer/index");
        } else {
            res.render("askOffer/taranakiRegion/offer/edit", {taranakiRegionOffer: foundTaranakiRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkTaranakiRegionOfferOwnership, function(req, res){
    // Find and update the offer
    TaranakiRegionOffer.findByIdAndUpdate(req.params.id, req.body.taranakiRegionOffer, function(err, updatedTaranakiRegionOffer){
        if(err){
            res.redirect("/askOffer/taranakiRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/taranakiRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkTaranakiRegionOfferOwnership, function(req, res){
    TaranakiRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/taranakiRegion/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/taranakiRegion/offer");
        }
    });
});

module.exports = router;