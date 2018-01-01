var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WestCoastRegionOffer       = require("../../app/models/askOffer/westCoastRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    WestCoastRegionOffer.find({}, function(err, allWestCoastRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/westCoastRegion/offer/index", {westCoastRegionOffer: allWestCoastRegionOffer});
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
    var newWestCoastRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    WestCoastRegionOffer.create(newWestCoastRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/westCoastRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/westCoastRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    WestCoastRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundWestCoastRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/westCoastRegion/offer/show", {westCoastRegionOffer: foundWestCoastRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkWestCoastRegionOfferOwnership, function(req, res){
    WestCoastRegionOffer.findById(req.params.id, function(err, foundWestCoastRegionOffer){
        if(err){
            res.redirect("/askOffer/westCoastRegion/offer/index");
        } else {
            res.render("askOffer/westCoastRegion/offer/edit", {westCoastRegionOffer: foundWestCoastRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkWestCoastRegionOfferOwnership, function(req, res){
    // Find and update the offer
    WestCoastRegionOffer.findByIdAndUpdate(req.params.id, req.body.westCoastRegionOffer, function(err, updatedWestCoastRegionOffer){
        if(err){
            res.redirect("/askOffer/westCoastRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/westCoastRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWestCoastRegionOfferOwnership, function(req, res){
    WestCoastRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/westCoastRegion/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/westCoastRegion/offer");
        }
    });
});

module.exports = router;