var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    GisborneRegionAsk       = require("../../app/models/askOffer/gisborneRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    GisborneRegionAsk.find({}, function(err, allGisborneRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/gisborneRegion/ask/index", {gisborneRegionAsk: allGisborneRegionAsk});
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
    var newGisborneRegionAsk = ({title: title, body: body, author: author});
    //create a new ask and save to DB
    GisborneRegionAsk.create(newGisborneRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/gisborneRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/gisborneRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    GisborneRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundGisborneRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/gisborneRegion/ask/show", {gisborneRegionAsk: foundGisborneRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkGisborneRegionAskOwnership, function(req, res){
    GisborneRegionAsk.findById(req.params.id, function(err, foundGisborneRegionAsk){
        if(err){
            res.redirect("/askOffer/gisborneRegion/ask/index");
        } else {
            res.render("askOffer/gisborneRegion/ask/edit", {gisborneRegionAsk: foundGisborneRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkGisborneRegionAskOwnership, function(req, res){
    // Find and update the ask
    GisborneRegionAsk.findByIdAndUpdate(req.params.id, req.body.gisborneRegionAsk, function(err, updatedGisborneRegionAsk){
        if(err){
            res.redirect("/askOffer/gisborneRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/gisborneRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkGisborneRegionAskOwnership, function(req, res){
    GisborneRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/gisborneRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/gisborneRegion/ask");
        }
    });
});

module.exports = router;