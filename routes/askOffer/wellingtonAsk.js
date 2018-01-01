var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WellingtonAsk       = require("../../app/models/askOffer/wellingtonAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    // Get all asks from DB
    WellingtonAsk.find({}, function(err, allWellingtonAsk){
        if(err){
            console.log(err);
        } else {
            res.render("askOffer/wellington/ask/index", {wellingtonAsk: allWellingtonAsk});
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
    var newWellingtonAsk = ({title: title, body: body, author: author});
    //create a new ask and save to DB
    WellingtonAsk.create(newWellingtonAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/wellington/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/wellington/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    WellingtonAsk.findById(req.params.id).populate("comments").exec(function(err, foundWellingtonAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/wellington/ask/show", {wellingtonAsk: foundWellingtonAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkWellingtonAskOwnership, function(req, res){
    WellingtonAsk.findById(req.params.id, function(err, foundWellingtonAsk){
        if(err){
            res.redirect("/askOffer/wellington/ask/index");
        } else {
            res.render("askOffer/wellington/ask/edit", {wellingtonAsk: foundWellingtonAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkWellingtonAskOwnership, function(req, res){
    // Find and update the ask
    WellingtonAsk.findByIdAndUpdate(req.params.id, req.body.wellingtonAsk, function(err, updatedWellingtonAsk){
        if(err){
            res.redirect("/askOffer/wellington/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/wellington/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWellingtonAskOwnership, function(req, res){
    WellingtonAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/wellington/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/wellington/ask");
        }
    });
});

module.exports = router;