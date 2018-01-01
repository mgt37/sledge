var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    SouthCanterburyAsk       = require("../../app/models/askOffer/southCanterburyAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    SouthCanterburyAsk.find({}, function(err, allSouthCanterburyAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/southCanterbury/ask/index", {southCanterburyAsk: allSouthCanterburyAsk});
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
    var newSouthCanterburyAsk = ({title: title, body: body, author: author});
    //create a new ask and save to DB
    SouthCanterburyAsk.create(newSouthCanterburyAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/southCanterbury/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/southCanterbury/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    SouthCanterburyAsk.findById(req.params.id).populate("comments").exec(function(err, foundSouthCanterburyAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/southCanterbury/ask/show", {southCanterburyAsk: foundSouthCanterburyAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkSouthCanterburyAskOwnership, function(req, res){
    SouthCanterburyAsk.findById(req.params.id, function(err, foundSouthCanterburyAsk){
        if(err){
            res.redirect("/askOffer/southCanterbury/ask/index");
        } else {
            res.render("askOffer/southCanterbury/ask/edit", {southCanterburyAsk: foundSouthCanterburyAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkSouthCanterburyAskOwnership, function(req, res){
    // Find and update the ask
    SouthCanterburyAsk.findByIdAndUpdate(req.params.id, req.body.southCanterburyAsk, function(err, updatedSouthCanterburyAsk){
        if(err){
            res.redirect("/askOffer/southCanterbury/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/southCanterbury/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkSouthCanterburyAskOwnership, function(req, res){
    SouthCanterburyAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/southCanterbury/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/southCanterbury/ask");
        }
    });
});

module.exports = router;