var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    CentralOtagoOffer       = require("../../app/models/askOffer/centralOtagoOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    CentralOtagoOffer.find({}, function(err, allCentralOtagoOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/centralOtago/offer/index", {centralOtagoOffer: allCentralOtagoOffer});
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
    var newCentralOtagoOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    CentralOtagoOffer.create(newCentralOtagoOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/centralOtago/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/centralOtago/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    CentralOtagoOffer.findById(req.params.id).populate("comments").exec(function(err, foundCentralOtagoOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/centralOtago/offer/show", {centralOtagoOffer: foundCentralOtagoOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkCentralOtagoOfferOwnership, function(req, res){
    CentralOtagoOffer.findById(req.params.id, function(err, foundCentralOtagoOffer){
        if(err){
            res.redirect("/askOffer/centralOtago/offer/index");
        } else {
            res.render("askOffer/centralOtago/offer/edit", {centralOtagoOffer: foundCentralOtagoOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkCentralOtagoOfferOwnership, function(req, res){
    // Find and update the offer
    CentralOtagoOffer.findByIdAndUpdate(req.params.id, req.body.centralOtagoOffer, function(err, updatedCentralOtagoOffer){
        if(err){
            res.redirect("/askOffer/centralOtago/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/centralOtago/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkCentralOtagoOfferOwnership, function(req, res){
    CentralOtagoOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/centralOtago/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/centralOtago/offer");
        }
    });
});

module.exports = router;