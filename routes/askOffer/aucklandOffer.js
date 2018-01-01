var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    AucklandOffer       = require("../../app/models/askOffer/aucklandOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    AucklandOffer.find({}, function(err, allAucklandOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/auckland/offer/index", {aucklandOffer: allAucklandOffer});
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
    var newAucklandOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    AucklandOffer.create(newAucklandOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/auckland/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/auckland/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    AucklandOffer.findById(req.params.id).populate("comments").exec(function(err, foundAucklandOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/auckland/offer/show", {aucklandOffer: foundAucklandOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkAucklandOfferOwnership, function(req, res){
    AucklandOffer.findById(req.params.id, function(err, foundAucklandOffer){
        if(err){
            res.redirect("/askOffer/auckland/offer/index");
        } else {
            res.render("askOffer/auckland/offer/edit", {aucklandOffer: foundAucklandOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkAucklandOfferOwnership, function(req, res){
    // Find and update the offer
    AucklandOffer.findByIdAndUpdate(req.params.id, req.body.aucklandOffer, function(err, updatedAucklandOffer){
        if(err){
            res.redirect("/askOffer/auckland/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/auckland/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkAucklandOfferOwnership, function(req, res){
    AucklandOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/auckland/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/auckland/offer");
        }
    });
});

module.exports = router;