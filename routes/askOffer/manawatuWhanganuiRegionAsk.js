var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    ManawatuWhanganuiRegionAsk       = require("../../app/models/askOffer/manawatuWhanganuiRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        ManawatuWhanganuiRegionAsk.find({title: regex}, function(err, allManawatuWhanganuiRegionAsk){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allManawatuWhanganuiRegionAsk.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/manawatuWhanganuiRegion/ask/index", {manawatuWhanganuiRegionAsk: allManawatuWhanganuiRegionAsk, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        ManawatuWhanganuiRegionAsk.find({}, function(err, allManawatuWhanganuiRegionAsk){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/manawatuWhanganuiRegion/ask/index", {manawatuWhanganuiRegionAsk: allManawatuWhanganuiRegionAsk, noMatch: noMatch});
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
    var newManawatuWhanganuiRegionAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    ManawatuWhanganuiRegionAsk.create(newManawatuWhanganuiRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/manawatuWhanganuiRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/manawatuWhanganuiRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    ManawatuWhanganuiRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundManawatuWhanganuiRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/manawatuWhanganuiRegion/ask/show", {manawatuWhanganuiRegionAsk: foundManawatuWhanganuiRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkManawatuWhanganuiRegionAskOwnership, function(req, res){
    ManawatuWhanganuiRegionAsk.findById(req.params.id, function(err, foundManawatuWhanganuiRegionAsk){
        if(err){
            res.redirect("/askOffer/manawatuWhanganuiRegion/ask/index");
        } else {
            res.render("askOffer/manawatuWhanganuiRegion/ask/edit", {manawatuWhanganuiRegionAsk: foundManawatuWhanganuiRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkManawatuWhanganuiRegionAskOwnership, function(req, res){
    // Find and update the ask
    ManawatuWhanganuiRegionAsk.findByIdAndUpdate(req.params.id, req.body.manawatuWhanganuiRegionAsk, function(err, updatedManawatuWhanganuiRegionAsk){
        if(err){
            res.redirect("/askOffer/manawatuWhanganuiRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/manawatuWhanganuiRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkManawatuWhanganuiRegionAskOwnership, function(req, res){
    ManawatuWhanganuiRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/manawatuWhanganuiRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/manawatuWhanganuiRegion/ask");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;