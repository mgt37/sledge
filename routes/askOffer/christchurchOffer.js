var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    ChristchurchOffer       = require("../../app/models/askOffer/christchurchOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        ChristchurchOffer.find({title: regex}, function(err, allChristchurchOffer){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allChristchurchOffer.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/christchurch/offer/index", {christchurchOffer: allChristchurchOffer, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        ChristchurchOffer.find({}, function(err, allChristchurchOffer){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/christchurch/offer/index", {christchurchOffer: allChristchurchOffer, noMatch: noMatch});
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
    var newChristchurchOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    ChristchurchOffer.create(newChristchurchOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/christchurch/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/christchurch/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    ChristchurchOffer.findById(req.params.id).populate("comments").exec(function(err, foundChristchurchOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/christchurch/offer/show", {christchurchOffer: foundChristchurchOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkChristchurchOfferOwnership, function(req, res){
    ChristchurchOffer.findById(req.params.id, function(err, foundChristchurchOffer){
        if(err){
            res.redirect("/askOffer/christchurch/offer/index");
        } else {
            res.render("askOffer/christchurch/offer/edit", {christchurchOffer: foundChristchurchOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkChristchurchOfferOwnership, function(req, res){
    // Find and update the ask
    ChristchurchOffer.findByIdAndUpdate(req.params.id, req.body.christchurchOffer, function(err, updatedChristchurchOffer){
        if(err){
            res.redirect("/askOffer/christchurch/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/christchurch/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkChristchurchOfferOwnership, function(req, res){
    ChristchurchOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/christchurch/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/christchurch/offer");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;