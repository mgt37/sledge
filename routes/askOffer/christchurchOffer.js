var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    ChristchurchOffer       = require("../../app/models/askOffer/christchurchOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    ChristchurchOffer.find({}, function(err, allChristchurchOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/christchurch/offer/index", {christchurchOffer: allChristchurchOffer});
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
    var newChristchurchOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    ChristchurchOffer.create(newChristchurchOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/christchurch/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/christchurch/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    ChristchurchOffer.findById(req.params.id).populate("comments").exec(function(err, foundChristchurchOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/christchurch/offer/show", {christchurchOffer: foundChristchurchOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkChristchurchOfferOwnership, function(req, res){
    ChristchurchOffer.findById(req.params.id, function(err, foundChristchurchOffer){
        if(err){
            res.redirect("/askOffer/christchurch/offer/index");
        } else {
            res.render("askOffer/christchurch/offer/edit", {christchurchOffer: foundChristchurchOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkChristchurchOfferOwnership, function(req, res){
    // Find and update the offer
    ChristchurchOffer.findByIdAndUpdate(req.params.id, req.body.christchurchOffer, function(err, updatedChristchurchOffer){
        if(err){
            res.redirect("/askOffer/christchurch/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/christchurch/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkChristchurchOfferOwnership, function(req, res){
    ChristchurchOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/christchurch/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/christchurch/offer");
        }
    });
});

module.exports = router;