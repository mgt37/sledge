var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    HamiltonAsk       = require("../../app/models/askOffer/hamiltonAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    HamiltonAsk.find({}, function(err, allHamiltonAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/hamilton/ask/index", {hamiltonAsk: allHamiltonAsk});
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
    var newHamiltonAsk = ({title: title, body: body, author: author});
    //create a new ask and save to DB
    HamiltonAsk.create(newHamiltonAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/hamilton/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/hamilton/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    HamiltonAsk.findById(req.params.id).populate("comments").exec(function(err, foundHamiltonAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/hamilton/ask/show", {hamiltonAsk: foundHamiltonAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkHamiltonAskOwnership, function(req, res){
    HamiltonAsk.findById(req.params.id, function(err, foundHamiltonAsk){
        if(err){
            res.redirect("/askOffer/hamilton/ask/index");
        } else {
            res.render("askOffer/hamilton/ask/edit", {hamiltonAsk: foundHamiltonAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkHamiltonAskOwnership, function(req, res){
    // Find and update the ask
    HamiltonAsk.findByIdAndUpdate(req.params.id, req.body.hamiltonAsk, function(err, updatedHamiltonAsk){
        if(err){
            res.redirect("/askOffer/hamilton/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/hamilton/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkHamiltonAskOwnership, function(req, res){
    HamiltonAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/hamilton/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/hamilton/ask");
        }
    });
});

module.exports = router;