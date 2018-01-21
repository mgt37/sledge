var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    AucklandOffer       = require("../../app/models/askOffer/aucklandOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        AucklandOffer.find({title: regex}, function(err, allAucklandOffer){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allAucklandOffer.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/auckland/offer/index", {aucklandOffer: allAucklandOffer, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        AucklandOffer.find({}, function(err, allAucklandOffer){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/auckland/offer/index", {aucklandOffer: allAucklandOffer, noMatch: noMatch});
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
    var newAucklandOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    AucklandOffer.create(newAucklandOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/auckland/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/auckland/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    AucklandOffer.findById(req.params.id).populate("comments").exec(function(err, foundAucklandOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/auckland/offer/show", {aucklandOffer: foundAucklandOffer});    
        }
    });
});

// EDIT Offer Route
router.get("/:id/edit", askOfferMiddleware.checkAucklandOfferOwnership, function(req, res){
    AucklandOffer.findById(req.params.id, function(err, foundAucklandOffer){
        if(err){
            res.redirect("/askOffer/auckland/offer/index");
        } else {
            res.render("askOffer/auckland/offer/edit", {aucklandOffer: foundAucklandOffer});
        }
    });
});

// UPDATE Offer Route
router.put("/:id", askOfferMiddleware.checkAucklandOfferOwnership, function(req, res){
    // Find and update the ask
    AucklandOffer.findByIdAndUpdate(req.params.id, req.body.aucklandOffer, function(err, updatedAucklandOffer){
        if(err){
            res.redirect("/askOffer/auckland/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/auckland/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkAucklandOfferOwnership, function(req, res){
    AucklandOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/auckland/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/auckland/offer");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;