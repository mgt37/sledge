var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    BayOfPlentyRegionOffer       = require("../../app/models/askOffer/bayOfPlentyRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    BayOfPlentyRegionOffer.find({}, function(err, allBayOfPlentyRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/bayOfPlentyRegion/offer/index", {bayOfPlentyRegionOffer: allBayOfPlentyRegionOffer});
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
    var newBayOfPlentyRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    BayOfPlentyRegionOffer.create(newBayOfPlentyRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/bayOfPlentyRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/bayOfPlentyRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    BayOfPlentyRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundBayOfPlentyRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/bayOfPlentyRegion/offer/show", {bayOfPlentyRegionOffer: foundBayOfPlentyRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkBayOfPlentyRegionOfferOwnership, function(req, res){
    BayOfPlentyRegionOffer.findById(req.params.id, function(err, foundBayOfPlentyRegionOffer){
        if(err){
            res.redirect("/askOffer/bayOfPlentyRegion/offer/index");
        } else {
            res.render("askOffer/bayOfPlentyRegion/offer/edit", {bayOfPlentyRegionOffer: foundBayOfPlentyRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkBayOfPlentyRegionOfferOwnership, function(req, res){
    // Find and update the offer
    BayOfPlentyRegionOffer.findByIdAndUpdate(req.params.id, req.body.bayOfPlentyRegionOffer, function(err, updatedBayOfPlentyRegionOffer){
        if(err){
            res.redirect("/askOffer/bayOfPlentyRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/bayOfPlentyRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkBayOfPlentyRegionOfferOwnership, function(req, res){
    BayOfPlentyRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/bayOfPlentyRegion/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/bayOfPlentyRegion/offer");
        }
    });
});

module.exports = router;