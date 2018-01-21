var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    CentralOtagoOffer       = require("../../app/models/askOffer/centralOtagoOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        CentralOtagoOffer.find({title: regex}, function(err, allCentralOtagoOffer){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                 if(allCentralOtagoOffer.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/centralOtago/offer/index", {centralOtagoOffer: allCentralOtagoOffer, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        CentralOtagoOffer.find({}, function(err, allCentralOtagoOffer){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/centralOtago/offer/index", {centralOtagoOffer: allCentralOtagoOffer, noMatch: noMatch});
            }
        });
    }
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
    var newCentralOtagoOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    CentralOtagoOffer.create(newCentralOtagoOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/centralOtago/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/centralOtago/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    CentralOtagoOffer.findById(req.params.id).populate("comments").exec(function(err, foundCentralOtagoOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/centralOtago/offer/show", {centralOtagoOffer: foundCentralOtagoOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkCentralOtagoOfferOwnership, function(req, res){
    CentralOtagoOffer.findById(req.params.id, function(err, foundCentralOtagoOffer){
        if(err){
            res.redirect("/askOffer/centralOtago/offer/index");
        } else {
            res.render("askOffer/centralOtago/offer/edit", {centralOtagoOffer: foundCentralOtagoOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkCentralOtagoOfferOwnership, function(req, res){
    // Find and update the ask
    CentralOtagoOffer.findByIdAndUpdate(req.params.id, req.body.centralOtagoOffer, function(err, updatedCentralOtagoOffer){
        if(err){
            res.redirect("/askOffer/centralOtago/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/centralOtago/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkCentralOtagoOfferOwnership, function(req, res){
    CentralOtagoOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/centralOtago/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/centralOtago/offer");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;