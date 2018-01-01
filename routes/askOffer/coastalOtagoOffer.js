var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    CoastalOtagoOffer       = require("../../app/models/askOffer/coastalOtagoOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    CoastalOtagoOffer.find({}, function(err, allCoastalOtagoOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/coastalOtago/offer/index", {coastalOtagoOffer: allCoastalOtagoOffer});
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
    var newCoastalOtagoOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    CoastalOtagoOffer.create(newCoastalOtagoOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/coastalOtago/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/coastalOtago/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    CoastalOtagoOffer.findById(req.params.id).populate("comments").exec(function(err, foundCoastalOtagoOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/coastalOtago/offer/show", {coastalOtagoOffer: foundCoastalOtagoOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkCoastalOtagoOfferOwnership, function(req, res){
    CoastalOtagoOffer.findById(req.params.id, function(err, foundCoastalOtagoOffer){
        if(err){
            res.redirect("/askOffer/coastalOtago/offer/index");
        } else {
            res.render("askOffer/coastalOtago/offer/edit", {coastalOtagoOffer: foundCoastalOtagoOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkCoastalOtagoOfferOwnership, function(req, res){
    // Find and update the offer
    CoastalOtagoOffer.findByIdAndUpdate(req.params.id, req.body.coastalOtagoOffer, function(err, updatedCoastalOtagoOffer){
        if(err){
            res.redirect("/askOffer/coastalOtago/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/coastalOtago/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkCoastalOtagoOfferOwnership, function(req, res){
    CoastalOtagoOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/coastalOtago/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/coastalOtago/offer");
        }
    });
});

module.exports = router;