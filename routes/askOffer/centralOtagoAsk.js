var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    CentralOtagoAsk       = require("../../app/models/askOffer/centralOtagoAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        CentralOtagoAsk.find({title: regex}, function(err, allCentralOtagoAsk){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allCentralOtagoAsk.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/centralOtago/ask/index", {centralOtagoAsk: allCentralOtagoAsk, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        CentralOtagoAsk.find({}, function(err, allCentralOtagoAsk){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/centralOtago/ask/index", {centralOtagoAsk: allCentralOtagoAsk, noMatch: noMatch});
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
    var newCentralOtagoAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    CentralOtagoAsk.create(newCentralOtagoAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/centralOtago/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/centralOtago/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    CentralOtagoAsk.findById(req.params.id).populate("comments").exec(function(err, foundCentralOtagoAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/centralOtago/ask/show", {centralOtagoAsk: foundCentralOtagoAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkCentralOtagoAskOwnership, function(req, res){
    CentralOtagoAsk.findById(req.params.id, function(err, foundCentralOtagoAsk){
        if(err){
            res.redirect("/askOffer/centralOtago/ask/index");
        } else {
            res.render("askOffer/centralOtago/ask/edit", {centralOtagoAsk: foundCentralOtagoAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkCentralOtagoAskOwnership, function(req, res){
    // Find and update the ask
    CentralOtagoAsk.findByIdAndUpdate(req.params.id, req.body.centralOtagoAsk, function(err, updatedCentralOtagoAsk){
        if(err){
            res.redirect("/askOffer/centralOtago/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/centralOtago/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkCentralOtagoAskOwnership, function(req, res){
    CentralOtagoAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/centralOtago/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/centralOtago/ask");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;