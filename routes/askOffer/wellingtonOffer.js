var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WellingtonOffer       = require("../../app/models/askOffer/wellingtonOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    WellingtonOffer.find({}, function(err, allWellingtonOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/wellington/offer/index", {wellingtonOffer: allWellingtonOffer});
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
    var newWellingtonOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    WellingtonOffer.create(newWellingtonOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/wellington/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/wellington/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    WellingtonOffer.findById(req.params.id).populate("comments").exec(function(err, foundWellingtonOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/wellington/offer/show", {wellingtonOffer: foundWellingtonOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkWellingtonOfferOwnership, function(req, res){
    WellingtonOffer.findById(req.params.id, function(err, foundWellingtonOffer){
        if(err){
            res.redirect("/askOffer/wellington/offer/index");
        } else {
            res.render("askOffer/wellington/offer/edit", {wellingtonOffer: foundWellingtonOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkWellingtonOfferOwnership, function(req, res){
    // Find and update the offer
    WellingtonOffer.findByIdAndUpdate(req.params.id, req.body.wellingtonOffer, function(err, updatedWellingtonOffer){
        if(err){
            res.redirect("/askOffer/wellington/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/wellington/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWellingtonOfferOwnership, function(req, res){
    WellingtonOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/wellington/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/wellington/offer");
        }
    });
});

module.exports = router;