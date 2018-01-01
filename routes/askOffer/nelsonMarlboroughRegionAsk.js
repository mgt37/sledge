var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    NelsonMarlboroughRegionAsk       = require("../../app/models/askOffer/nelsonMarlboroughRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    NelsonMarlboroughRegionAsk.find({}, function(err, allNelsonMarlboroughRegionAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/nelsonMarlboroughRegion/ask/index", {nelsonMarlboroughRegionAsk: allNelsonMarlboroughRegionAsk});
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
    var newNelsonMarlboroughRegionAsk = ({title: title, body: body, author: author});
    //create a new ask and save to DB
    NelsonMarlboroughRegionAsk.create(newNelsonMarlboroughRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/nelsonMarlboroughRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/nelsonMarlboroughRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    NelsonMarlboroughRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundNelsonMarlboroughRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/nelsonMarlboroughRegion/ask/show", {nelsonMarlboroughRegionAsk: foundNelsonMarlboroughRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkNelsonMarlboroughRegionAskOwnership, function(req, res){
    NelsonMarlboroughRegionAsk.findById(req.params.id, function(err, foundNelsonMarlboroughRegionAsk){
        if(err){
            res.redirect("/askOffer/nelsonMarlboroughRegion/ask/index");
        } else {
            res.render("askOffer/nelsonMarlboroughRegion/ask/edit", {nelsonMarlboroughRegionAsk: foundNelsonMarlboroughRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkNelsonMarlboroughRegionAskOwnership, function(req, res){
    // Find and update the ask
    NelsonMarlboroughRegionAsk.findByIdAndUpdate(req.params.id, req.body.nelsonMarlboroughRegionAsk, function(err, updatedNelsonMarlboroughRegionAsk){
        if(err){
            res.redirect("/askOffer/nelsonMarlboroughRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/nelsonMarlboroughRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkNelsonMarlboroughRegionAskOwnership, function(req, res){
    NelsonMarlboroughRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/nelsonMarlboroughRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/nelsonMarlboroughRegion/ask");
        }
    });
});

module.exports = router;