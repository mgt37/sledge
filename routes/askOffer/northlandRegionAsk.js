var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    NorthlandRegionAsk       = require("../../app/models/askOffer/northlandRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        NorthlandRegionAsk.find({title: regex}, function(err, allNorthlandRegionAsk){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allNorthlandRegionAsk.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/northlandRegion/ask/index", {northlandRegionAsk: allNorthlandRegionAsk, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        NorthlandRegionAsk.find({}, function(err, allNorthlandRegionAsk){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/northlandRegion/ask/index", {northlandRegionAsk: allNorthlandRegionAsk, noMatch: noMatch});
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
    var newNorthlandRegionAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    NorthlandRegionAsk.create(newNorthlandRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/northlandRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/northlandRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    NorthlandRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundNorthlandRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/northlandRegion/ask/show", {northlandRegionAsk: foundNorthlandRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkNorthlandRegionAskOwnership, function(req, res){
    NorthlandRegionAsk.findById(req.params.id, function(err, foundNorthlandRegionAsk){
        if(err){
            res.redirect("/askOffer/northlandRegion/ask/index");
        } else {
            res.render("askOffer/northlandRegion/ask/edit", {northlandRegionAsk: foundNorthlandRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkNorthlandRegionAskOwnership, function(req, res){
    // Find and update the ask
    NorthlandRegionAsk.findByIdAndUpdate(req.params.id, req.body.northlandRegionAsk, function(err, updatedNorthlandRegionAsk){
        if(err){
            res.redirect("/askOffer/northlandRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/northlandRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkNorthlandRegionAskOwnership, function(req, res){
    NorthlandRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/northlandRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/northlandRegion/ask");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;