var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WaikatoRegionAsk       = require("../../app/models/askOffer/waikatoRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    WaikatoRegionAsk.find({}, function(err, allWaikatoRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/waikatoRegion/ask/index", {waikatoRegionAsk: allWaikatoRegionAsk});
        }
    });
});

//CREATE - add new ask to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to ask array
    var title  = req.body.title;
    var body   = req.body.body;
    var hourlyRate = req.body.hourlyRate;
    var contactEmail = req.body.contactEmail;
    var otherContact = req.body.otherContact;
    var author = {
        id: req.user._id,
        username: req.user.local.username || req.user.facebook.name || req.user.twitter.username || req.user.google.name
    };
    var newWaikatoRegionAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    WaikatoRegionAsk.create(newWaikatoRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/waikatoRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/waikatoRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    WaikatoRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundWaikatoRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/waikatoRegion/ask/show", {waikatoRegionAsk: foundWaikatoRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkWaikatoRegionAskOwnership, function(req, res){
    WaikatoRegionAsk.findById(req.params.id, function(err, foundWaikatoRegionAsk){
        if(err){
            res.redirect("/askOffer/waikatoRegion/ask/index");
        } else {
            res.render("askOffer/waikatoRegion/ask/edit", {waikatoRegionAsk: foundWaikatoRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkWaikatoRegionAskOwnership, function(req, res){
    // Find and update the ask
    WaikatoRegionAsk.findByIdAndUpdate(req.params.id, req.body.waikatoRegionAsk, function(err, updatedWaikatoRegionAsk){
        if(err){
            res.redirect("/askOffer/waikatoRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/waikatoRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWaikatoRegionAskOwnership, function(req, res){
    WaikatoRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/waikatoRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/waikatoRegion/ask");
        }
    });
});

module.exports = router;