var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WestCoastRegionAsk       = require("../../app/models/askOffer/westCoastRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        WestCoastRegionAsk.find({title: regex}, function(err, allWestCoastRegionAsk){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allWestCoastRegionAsk.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/westCoastRegion/ask/index", {westCoastRegionAsk: allWestCoastRegionAsk, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        WestCoastRegionAsk.find({}, function(err, allWestCoastRegionAsk){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/westCoastRegion/ask/index", {westCoastRegionAsk: allWestCoastRegionAsk, noMatch: noMatch});
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
    var newWestCoastRegionAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    WestCoastRegionAsk.create(newWestCoastRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/westCoastRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/westCoastRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    WestCoastRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundWestCoastRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/westCoastRegion/ask/show", {westCoastRegionAsk: foundWestCoastRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkWestCoastRegionAskOwnership, function(req, res){
    WestCoastRegionAsk.findById(req.params.id, function(err, foundWestCoastRegionAsk){
        if(err){
            res.redirect("/askOffer/westCoastRegion/ask/index");
        } else {
            res.render("askOffer/westCoastRegion/ask/edit", {westCoastRegionAsk: foundWestCoastRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkWestCoastRegionAskOwnership, function(req, res){
    // Find and update the ask
    WestCoastRegionAsk.findByIdAndUpdate(req.params.id, req.body.westCoastRegionAsk, function(err, updatedWestCoastRegionAsk){
        if(err){
            res.redirect("/askOffer/westCoastRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/westCoastRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWestCoastRegionAskOwnership, function(req, res){
    WestCoastRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/westCoastRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/westCoastRegion/ask");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;