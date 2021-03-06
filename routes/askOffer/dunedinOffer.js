var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    DunedinOffer       = require("../../app/models/askOffer/dunedinOffer"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        DunedinOffer.find({title: regex}, function(err, allDunedinOffer){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allDunedinOffer.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/dunedin/offer/index", {dunedinOffer: allDunedinOffer, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        DunedinOffer.find({}, function(err, allDunedinOffer){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/dunedin/offer/index", {dunedinOffer: allDunedinOffer, noMatch: noMatch});
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
    var newDunedinOffer = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    DunedinOffer.create(newDunedinOffer, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/dunedin/offer");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/dunedin/offer/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    DunedinOffer.findById(req.params.id).populate("comments").exec(function(err, foundDunedinOffer){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/dunedin/offer/show", {dunedinOffer: foundDunedinOffer});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkDunedinOfferOwnership, function(req, res){
    DunedinOffer.findById(req.params.id, function(err, foundDunedinOffer){
        if(err){
            res.redirect("/askOffer/dunedin/offer/index");
        } else {
            res.render("askOffer/dunedin/offer/edit", {dunedinOffer: foundDunedinOffer});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkDunedinOfferOwnership, function(req, res){
    // Find and update the ask
    DunedinOffer.findByIdAndUpdate(req.params.id, req.body.dunedinOffer, function(err, updatedDunedinOffer){
        if(err){
            res.redirect("/askOffer/dunedin/offer/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/dunedin/offer/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkDunedinOfferOwnership, function(req, res){
    DunedinOffer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/dunedin/offer");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/dunedin/offer");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;