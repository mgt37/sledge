var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    SouthlandRegionOffer       = require("../../app/models/askOffer/southlandRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        SouthlandRegionOffer.find({title: regex}, function(err, allSouthlandRegionOffer){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allSouthlandRegionOffer.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/southlandRegion/offer/index", {southlandRegionOffer: allSouthlandRegionOffer, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        SouthlandRegionOffer.find({}, function(err, allSouthlandRegionOffer){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/southlandRegion/offer/index", {southlandRegionOffer: allSouthlandRegionOffer, noMatch: noMatch});
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
    var newSouthlandRegionOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    SouthlandRegionOffer.create(newSouthlandRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/southlandRegion/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/southlandRegion/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    SouthlandRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundSouthlandRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/southlandRegion/offer/show", {southlandRegionOffer: foundSouthlandRegionOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkSouthlandRegionOfferOwnership, function(req, res){
    SouthlandRegionOffer.findById(req.params.id, function(err, foundSouthlandRegionOffer){
        if(err){
            res.redirect("/askOffer/southlandRegion/offer/index");
        } else {
            res.render("askOffer/southlandRegion/offer/edit", {southlandRegionOffer: foundSouthlandRegionOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkSouthlandRegionOfferOwnership, function(req, res){
    // Find and update the ask
    SouthlandRegionOffer.findByIdAndUpdate(req.params.id, req.body.southlandRegionOffer, function(err, updatedSouthlandRegionOffer){
        if(err){
            res.redirect("/askOffer/southlandRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/southlandRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkSouthlandRegionOfferOwnership, function(req, res){
    SouthlandRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/southlandRegion/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/southlandRegion/offer");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;