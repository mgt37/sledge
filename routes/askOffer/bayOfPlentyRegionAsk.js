var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    BayOfPlentyRegionAsk       = require("../../app/models/askOffer/bayOfPlentyRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    BayOfPlentyRegionAsk.find({}, function(err, allBayOfPlentyRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/bayOfPlentyRegion/ask/index", {bayOfPlentyRegionAsk: allBayOfPlentyRegionAsk});
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
    var newBayOfPlentyRegionAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    BayOfPlentyRegionAsk.create(newBayOfPlentyRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/bayOfPlentyRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/bayOfPlentyRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    BayOfPlentyRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundBayOfPlentyRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/bayOfPlentyRegion/ask/show", {bayOfPlentyRegionAsk: foundBayOfPlentyRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkBayOfPlentyRegionAskOwnership, function(req, res){
    BayOfPlentyRegionAsk.findById(req.params.id, function(err, foundBayOfPlentyRegionAsk){
        if(err){
            res.redirect("/askOffer/bayOfPlentyRegion/ask/index");
        } else {
            res.render("askOffer/bayOfPlentyRegion/ask/edit", {bayOfPlentyRegionAsk: foundBayOfPlentyRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkBayOfPlentyRegionAskOwnership, function(req, res){
    // Find and update the ask
    BayOfPlentyRegionAsk.findByIdAndUpdate(req.params.id, req.body.bayOfPlentyRegionAsk, function(err, updatedBayOfPlentyRegionAsk){
        if(err){
            res.redirect("/askOffer/bayOfPlentyRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/bayOfPlentyRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkBayOfPlentyRegionAskOwnership, function(req, res){
    BayOfPlentyRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/bayOfPlentyRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/bayOfPlentyRegion/ask");
        }
    });
});

module.exports = router;