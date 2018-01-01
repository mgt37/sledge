var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    NelsonMarlboroughRegionOffer       = require("../../app/models/askOffer/nelsonMarlboroughRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    NelsonMarlboroughRegionOffer.find({}, function(err, allNelsonMarlboroughRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/nelsonMarlboroughRegion/offer/index", {nelsonMarlboroughRegionOffer: allNelsonMarlboroughRegionOffer});
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
    var newNelsonMarlboroughRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    NelsonMarlboroughRegionOffer.create(newNelsonMarlboroughRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/nelsonMarlboroughRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    NelsonMarlboroughRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundNelsonMarlboroughRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/nelsonMarlboroughRegion/offer/show", {nelsonMarlboroughRegionOffer: foundNelsonMarlboroughRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkNelsonMarlboroughRegionOfferOwnership, function(req, res){
    NelsonMarlboroughRegionOffer.findById(req.params.id, function(err, foundNelsonMarlboroughRegionOffer){
        if(err){
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer/index");
        } else {
            res.render("askOffer/nelsonMarlboroughRegion/offer/edit", {nelsonMarlboroughRegionOffer: foundNelsonMarlboroughRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkNelsonMarlboroughRegionOfferOwnership, function(req, res){
    // Find and update the offer
    NelsonMarlboroughRegionOffer.findByIdAndUpdate(req.params.id, req.body.nelsonMarlboroughRegionOffer, function(err, updatedNelsonMarlboroughRegionOffer){
        if(err){
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkNelsonMarlboroughRegionOfferOwnership, function(req, res){
    NelsonMarlboroughRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/nelsonMarlboroughRegion/offer");
        }
    });
});

module.exports = router;