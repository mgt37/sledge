var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WestCoastRegionOffer       = require("../../app/models/askOffer/westCoastRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        WestCoastRegionOffer.find({title: regex}, function(err, allWestCoastRegionOffer){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allWestCoastRegionOffer.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/westCoastRegion/offer/index", {westCoastRegionOffer: allWestCoastRegionOffer, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        WestCoastRegionOffer.find({}, function(err, allWestCoastRegionOffer){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/westCoastRegion/offer/index", {westCoastRegionOffer: allWestCoastRegionOffer, noMatch: noMatch});
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
    var newWestCoastRegionOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    WestCoastRegionOffer.create(newWestCoastRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/westCoastRegion/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/westCoastRegion/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    WestCoastRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundWestCoastRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/westCoastRegion/offer/show", {westCoastRegionOffer: foundWestCoastRegionOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkWestCoastRegionOfferOwnership, function(req, res){
    WestCoastRegionOffer.findById(req.params.id, function(err, foundWestCoastRegionOffer){
        if(err){
            res.redirect("/askOffer/westCoastRegion/offer/index");
        } else {
            res.render("askOffer/westCoastRegion/offer/edit", {westCoastRegionOffer: foundWestCoastRegionOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkWestCoastRegionOfferOwnership, function(req, res){
    // Find and update the ask
    WestCoastRegionOffer.findByIdAndUpdate(req.params.id, req.body.westCoastRegionOffer, function(err, updatedWestCoastRegionOffer){
        if(err){
            res.redirect("/askOffer/westCoastRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/westCoastRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWestCoastRegionOfferOwnership, function(req, res){
    WestCoastRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/westCoastRegion/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/westCoastRegion/offer");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;