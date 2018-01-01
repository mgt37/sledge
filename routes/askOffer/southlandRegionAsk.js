var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    SouthlandRegionAsk       = require("../../app/models/askOffer/southlandRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    SouthlandRegionAsk.find({}, function(err, allSouthlandRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/southlandRegion/ask/index", {southlandRegionAsk: allSouthlandRegionAsk});
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
    var newSouthlandRegionAsk = ({title: title, body: body, author: author});
    //create a new ask and save to DB
    SouthlandRegionAsk.create(newSouthlandRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/southlandRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/southlandRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    SouthlandRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundSouthlandRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/southlandRegion/ask/show", {southlandRegionAsk: foundSouthlandRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkSouthlandRegionAskOwnership, function(req, res){
    SouthlandRegionAsk.findById(req.params.id, function(err, foundSouthlandRegionAsk){
        if(err){
            res.redirect("/askOffer/southlandRegion/ask/index");
        } else {
            res.render("askOffer/southlandRegion/ask/edit", {southlandRegionAsk: foundSouthlandRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkSouthlandRegionAskOwnership, function(req, res){
    // Find and update the ask
    SouthlandRegionAsk.findByIdAndUpdate(req.params.id, req.body.southlandRegionAsk, function(err, updatedSouthlandRegionAsk){
        if(err){
            res.redirect("/askOffer/southlandRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/southlandRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkSouthlandRegionAskOwnership, function(req, res){
    SouthlandRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/southlandRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/southlandRegion/ask");
        }
    });
});

module.exports = router;