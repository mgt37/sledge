var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    DunedinAsk       = require("../../app/models/askOffer/dunedinAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    DunedinAsk.find({}, function(err, allDunedinAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/dunedin/ask/index", {dunedinAsk: allDunedinAsk});
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
    var newDunedinAsk = ({title: title, body: body, author: author});
    //create a new ask and save to DB
    DunedinAsk.create(newDunedinAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/dunedin/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/dunedin/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    DunedinAsk.findById(req.params.id).populate("comments").exec(function(err, foundDunedinAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/dunedin/ask/show", {dunedinAsk: foundDunedinAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkDunedinAskOwnership, function(req, res){
    DunedinAsk.findById(req.params.id, function(err, foundDunedinAsk){
        if(err){
            res.redirect("/askOffer/dunedin/ask/index");
        } else {
            res.render("askOffer/dunedin/ask/edit", {dunedinAsk: foundDunedinAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkDunedinAskOwnership, function(req, res){
    // Find and update the ask
    DunedinAsk.findByIdAndUpdate(req.params.id, req.body.dunedinAsk, function(err, updatedDunedinAsk){
        if(err){
            res.redirect("/askOffer/dunedin/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/dunedin/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkDunedinAskOwnership, function(req, res){
    DunedinAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/dunedin/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/dunedin/ask");
        }
    });
});

module.exports = router;