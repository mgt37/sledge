var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    SouthCanterburyOffer       = require("../../app/models/askOffer/southCanterburyOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        SouthCanterburyOffer.find({title: regex}, function(err, allSouthCanterburyOffer){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allSouthCanterburyOffer.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/southCanterbury/offer/index", {southCanterburyOffer: allSouthCanterburyOffer, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        SouthCanterburyOffer.find({}, function(err, allSouthCanterburyOffer){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/southCanterbury/offer/index", {southCanterburyOffer: allSouthCanterburyOffer, noMatch: noMatch});
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
    var newSouthCanterburyOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    SouthCanterburyOffer.create(newSouthCanterburyOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/southCanterbury/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/southCanterbury/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    SouthCanterburyOffer.findById(req.params.id).populate("comments").exec(function(err, foundSouthCanterburyOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/southCanterbury/offer/show", {southCanterburyOffer: foundSouthCanterburyOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkSouthCanterburyOfferOwnership, function(req, res){
    SouthCanterburyOffer.findById(req.params.id, function(err, foundSouthCanterburyOffer){
        if(err){
            res.redirect("/askOffer/southCanterbury/offer/index");
        } else {
            res.render("askOffer/southCanterbury/offer/edit", {southCanterburyOffer: foundSouthCanterburyOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkSouthCanterburyOfferOwnership, function(req, res){
    // Find and update the ask
    SouthCanterburyOffer.findByIdAndUpdate(req.params.id, req.body.southCanterburyOffer, function(err, updatedSouthCanterburyOffer){
        if(err){
            res.redirect("/askOffer/southCanterbury/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/southCanterbury/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkSouthCanterburyOfferOwnership, function(req, res){
    SouthCanterburyOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/southCanterbury/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/southCanterbury/offer");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;