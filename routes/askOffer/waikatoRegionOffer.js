var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WaikatoRegionOffer       = require("../../app/models/askOffer/waikatoRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    WaikatoRegionOffer.find({}, function(err, allWaikatoRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/waikatoRegion/offer/index", {waikatoRegionOffer: allWaikatoRegionOffer});
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
    var newWaikatoRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    WaikatoRegionOffer.create(newWaikatoRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/waikatoRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/waikatoRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    WaikatoRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundWaikatoRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/waikatoRegion/offer/show", {waikatoRegionOffer: foundWaikatoRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkWaikatoRegionOfferOwnership, function(req, res){
    WaikatoRegionOffer.findById(req.params.id, function(err, foundWaikatoRegionOffer){
        if(err){
            res.redirect("/askOffer/waikatoRegion/offer/index");
        } else {
            res.render("askOffer/waikatoRegion/offer/edit", {waikatoRegionOffer: foundWaikatoRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkWaikatoRegionOfferOwnership, function(req, res){
    // Find and update the offer
    WaikatoRegionOffer.findByIdAndUpdate(req.params.id, req.body.waikatoRegionOffer, function(err, updatedWaikatoRegionOffer){
        if(err){
            res.redirect("/askOffer/waikatoRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/waikatoRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWaikatoRegionOfferOwnership, function(req, res){
    WaikatoRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/waikatoRegion/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/waikatoRegion/offer");
        }
    });
});

module.exports = router;