var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    DunedinOffer       = require("../../app/models/askOffer/dunedinOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all offers
router.get("/", function(req, res){
    // Get all offers from DB
    DunedinOffer.find({}, function(err, allDunedinOffer){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/dunedin/offer/index", {dunedinOffer: allDunedinOffer});
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
    var newDunedinOffer = ({title: title, body: body, author: author});
    //create a new offer and save to DB
    DunedinOffer.create(newDunedinOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/dunedin/offer");
        }
    });
});

//NEW - Show form to create new offer
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/dunedin/offer/new");
});

//SHOW - Shows more information about one offer
router.get("/:id", function(req, res){
    //Find the offer with provided ID
    DunedinOffer.findById(req.params.id).populate("comments").exec(function(err, foundDunedinOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that offer
            res.render("askOffer/dunedin/offer/show", {dunedinOffer: foundDunedinOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkDunedinOfferOwnership, function(req, res){
    DunedinOffer.findById(req.params.id, function(err, foundDunedinOffer){
        if(err){
            res.redirect("/askOffer/dunedin/offer/index");
        } else {
            res.render("askOffer/dunedin/offer/edit", {dunedinOffer: foundDunedinOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkDunedinOfferOwnership, function(req, res){
    // Find and update the offer
    DunedinOffer.findByIdAndUpdate(req.params.id, req.body.dunedinOffer, function(err, updatedDunedinOffer){
        if(err){
            res.redirect("/askOffer/dunedin/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/dunedin/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkDunedinOfferOwnership, function(req, res){
    DunedinOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/dunedin/offer");
        } else {
            req.flash("success", "offer deleted");
            res.redirect("/askOffer/dunedin/offer");
        }
    });
});

module.exports = router;