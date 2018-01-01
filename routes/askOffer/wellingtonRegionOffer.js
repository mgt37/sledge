var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WellingtonRegionOffer       = require("../../app/models/askOffer/wellingtonRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    WellingtonRegionOffer.find({}, function(err, allWellingtonRegionOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/wellingtonRegion/offer/index", {wellingtonRegionOffer: allWellingtonRegionOffer});
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
    var newWellingtonRegionOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    WellingtonRegionOffer.create(newWellingtonRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/wellingtonRegion/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/wellingtonRegion/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    WellingtonRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundWellingtonRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/wellingtonRegion/offer/show", {wellingtonRegionOffer: foundWellingtonRegionOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkWellingtonRegionOfferOwnership, function(req, res){
    WellingtonRegionOffer.findById(req.params.id, function(err, foundWellingtonRegionOffer){
        if(err){
            res.redirect("/askOffer/wellingtonRegion/offer/index");
        } else {
            res.render("askOffer/wellingtonRegion/offer/edit", {wellingtonRegionOffer: foundWellingtonRegionOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkWellingtonRegionOfferOwnership, function(req, res){
    // Find and update the offer
    WellingtonRegionOffer.findByIdAndUpdate(req.params.id, req.body.wellingtonRegionOffer, function(err, updatedWellingtonRegionOffer){
        if(err){
            res.redirect("/askOffer/wellingtonRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/wellingtonRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWellingtonRegionOfferOwnership, function(req, res){
    WellingtonRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/wellingtonRegion/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/wellingtonRegion/offer");
        }
    });
});

module.exports = router;