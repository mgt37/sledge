var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    ChristchurchAsk       = require("../../app/models/askOffer/christchurchAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    ChristchurchAsk.find({}, function(err, allChristchurchAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/christchurch/ask/index", {christchurchAsk: allChristchurchAsk});
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
    var newChristchurchAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    ChristchurchAsk.create(newChristchurchAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/christchurch/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/christchurch/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    ChristchurchAsk.findById(req.params.id).populate("comments").exec(function(err, foundChristchurchAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/christchurch/ask/show", {christchurchAsk: foundChristchurchAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkChristchurchAskOwnership, function(req, res){
    ChristchurchAsk.findById(req.params.id, function(err, foundChristchurchAsk){
        if(err){
            res.redirect("/askOffer/christchurch/ask/index");
        } else {
            res.render("askOffer/christchurch/ask/edit", {christchurchAsk: foundChristchurchAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkChristchurchAskOwnership, function(req, res){
    // Find and update the ask
    ChristchurchAsk.findByIdAndUpdate(req.params.id, req.body.christchurchAsk, function(err, updatedChristchurchAsk){
        if(err){
            res.redirect("/askOffer/christchurch/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/christchurch/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkChristchurchAskOwnership, function(req, res){
    ChristchurchAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/christchurch/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/christchurch/ask");
        }
    });
});

module.exports = router;