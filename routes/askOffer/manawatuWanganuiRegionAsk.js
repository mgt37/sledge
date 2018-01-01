var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    ManawatuWanganuiRegionAsk       = require("../../app/models/askOffer/manawatuWanganuiRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    ManawatuWanganuiRegionAsk.find({}, function(err, allManawatuWanganuiRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/manawatuWanganuiRegion/ask/index", {manawatuWanganuiRegionAsk: allManawatuWanganuiRegionAsk});
        }
    });
});

//CREATE - add new ask to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to ask array
    var title  = req.body.title;
    var body   = req.body.body;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newManawatuWanganuiRegionAsk = ({title: title, body: body, author: author});
    //create a new ask and save to DB
    ManawatuWanganuiRegionAsk.create(newManawatuWanganuiRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/manawatuWanganuiRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/manawatuWanganuiRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    ManawatuWanganuiRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundManawatuWanganuiRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/manawatuWanganuiRegion/ask/show", {manawatuWanganuiRegionAsk: foundManawatuWanganuiRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkManawatuWanganuiRegionAskOwnership, function(req, res){
    ManawatuWanganuiRegionAsk.findById(req.params.id, function(err, foundManawatuWanganuiRegionAsk){
        if(err){
            res.redirect("/askOffer/manawatuWanganuiRegion/ask/index");
        } else {
            res.render("askOffer/manawatuWanganuiRegion/ask/edit", {manawatuWanganuiRegionAsk: foundManawatuWanganuiRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkManawatuWanganuiRegionAskOwnership, function(req, res){
    // Find and update the ask
    ManawatuWanganuiRegionAsk.findByIdAndUpdate(req.params.id, req.body.manawatuWanganuiRegionAsk, function(err, updatedManawatuWanganuiRegionAsk){
        if(err){
            res.redirect("/askOffer/manawatuWanganuiRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/manawatuWanganuiRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkManawatuWanganuiRegionAskOwnership, function(req, res){
    ManawatuWanganuiRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/manawatuWanganuiRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/manawatuWanganuiRegion/ask");
        }
    });
});

module.exports = router;