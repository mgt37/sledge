var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    AucklandAsk       = require("../../app/models/askOffer/aucklandAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        AucklandAsk.find({title: regex}, function(err, allAucklandAsk){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allAucklandAsk.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/auckland/ask/index", {aucklandAsk: allAucklandAsk, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        AucklandAsk.find({}, function(err, allAucklandAsk){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/auckland/ask/index", {aucklandAsk: allAucklandAsk, noMatch: noMatch});
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
    var newAucklandAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    AucklandAsk.create(newAucklandAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/auckland/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/auckland/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    AucklandAsk.findById(req.params.id).populate("comments").exec(function(err, foundAucklandAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/auckland/ask/show", {aucklandAsk: foundAucklandAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkAucklandAskOwnership, function(req, res){
    AucklandAsk.findById(req.params.id, function(err, foundAucklandAsk){
        if(err){
            res.redirect("/askOffer/auckland/ask/index");
        } else {
            res.render("askOffer/auckland/ask/edit", {aucklandAsk: foundAucklandAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkAucklandAskOwnership, function(req, res){
    // Find and update the ask
    AucklandAsk.findByIdAndUpdate(req.params.id, req.body.aucklandAsk, function(err, updatedAucklandAsk){
        if(err){
            res.redirect("/askOffer/auckland/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/auckland/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkAucklandAskOwnership, function(req, res){
    AucklandAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/auckland/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/auckland/ask");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;