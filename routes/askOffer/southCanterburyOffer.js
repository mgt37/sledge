var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    SouthCanterburyOffer       = require("../../app/models/askOffer/southCanterburyOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    SouthCanterburyOffer.find({}, function(err, allSouthCanterburyOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/southCanterbury/offer/index", {southCanterburyOffer: allSouthCanterburyOffer});
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
    var newSouthCanterburyOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    SouthCanterburyOffer.create(newSouthCanterburyOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/southCanterbury/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/southCanterbury/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    SouthCanterburyOffer.findById(req.params.id).populate("comments").exec(function(err, foundSouthCanterburyOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/southCanterbury/offer/show", {southCanterburyOffer: foundSouthCanterburyOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkSouthCanterburyOfferOwnership, function(req, res){
    SouthCanterburyOffer.findById(req.params.id, function(err, foundSouthCanterburyOffer){
        if(err){
            res.redirect("/askOffer/southCanterbury/offer/index");
        } else {
            res.render("askOffer/southCanterbury/offer/edit", {southCanterburyOffer: foundSouthCanterburyOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkSouthCanterburyOfferOwnership, function(req, res){
    // Find and update the offer
    SouthCanterburyOffer.findByIdAndUpdate(req.params.id, req.body.southCanterburyOffer, function(err, updatedSouthCanterburyOffer){
        if(err){
            res.redirect("/askOffer/southCanterbury/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/southCanterbury/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkSouthCanterburyOfferOwnership, function(req, res){
    SouthCanterburyOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/southCanterbury/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/southCanterbury/offer");
        }
    });
});

module.exports = router;