var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WaikatoRegionOffer       = require("../../app/models/askOffer/waikatoRegionOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        WaikatoRegionOffer.find({title: regex}, function(err, allWaikatoRegionOffer){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allWaikatoRegionOffer.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/waikatoRegion/offer/index", {waikatoRegionOffer: allWaikatoRegionOffer, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        WaikatoRegionOffer.find({}, function(err, allWaikatoRegionOffer){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/waikatoRegion/offer/index", {waikatoRegionOffer: allWaikatoRegionOffer, noMatch: noMatch});
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
    var newWaikatoRegionOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    WaikatoRegionOffer.create(newWaikatoRegionOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/waikatoRegion/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/waikatoRegion/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    WaikatoRegionOffer.findById(req.params.id).populate("comments").exec(function(err, foundWaikatoRegionOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/waikatoRegion/offer/show", {waikatoRegionOffer: foundWaikatoRegionOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkWaikatoRegionOfferOwnership, function(req, res){
    WaikatoRegionOffer.findById(req.params.id, function(err, foundWaikatoRegionOffer){
        if(err){
            res.redirect("/askOffer/waikatoRegion/offer/index");
        } else {
            res.render("askOffer/waikatoRegion/offer/edit", {waikatoRegionOffer: foundWaikatoRegionOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkWaikatoRegionOfferOwnership, function(req, res){
    // Find and update the ask
    WaikatoRegionOffer.findByIdAndUpdate(req.params.id, req.body.waikatoRegionOffer, function(err, updatedWaikatoRegionOffer){
        if(err){
            res.redirect("/askOffer/waikatoRegion/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/waikatoRegion/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWaikatoRegionOfferOwnership, function(req, res){
    WaikatoRegionOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/waikatoRegion/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/waikatoRegion/offer");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;