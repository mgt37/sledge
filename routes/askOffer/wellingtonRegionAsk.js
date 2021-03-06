var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    WellingtonRegionAsk       = require("../../app/models/askOffer/wellingtonRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        WellingtonRegionAsk.find({title: regex}, function(err, allWellingtonRegionAsk){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allWellingtonRegionAsk.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/wellingtonRegion/ask/index", {wellingtonRegionAsk: allWellingtonRegionAsk, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        WellingtonRegionAsk.find({}, function(err, allWellingtonRegionAsk){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/wellingtonRegion/ask/index", {wellingtonRegionAsk: allWellingtonRegionAsk, noMatch: noMatch});
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
    var newWellingtonRegionAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    WellingtonRegionAsk.create(newWellingtonRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/wellingtonRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/wellingtonRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    WellingtonRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundWellingtonRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/wellingtonRegion/ask/show", {wellingtonRegionAsk: foundWellingtonRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkWellingtonRegionAskOwnership, function(req, res){
    WellingtonRegionAsk.findById(req.params.id, function(err, foundWellingtonRegionAsk){
        if(err){
            res.redirect("/askOffer/wellingtonRegion/ask/index");
        } else {
            res.render("askOffer/wellingtonRegion/ask/edit", {wellingtonRegionAsk: foundWellingtonRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkWellingtonRegionAskOwnership, function(req, res){
    // Find and update the ask
    WellingtonRegionAsk.findByIdAndUpdate(req.params.id, req.body.wellingtonRegionAsk, function(err, updatedWellingtonRegionAsk){
        if(err){
            res.redirect("/askOffer/wellingtonRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/wellingtonRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkWellingtonRegionAskOwnership, function(req, res){
    WellingtonRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/wellingtonRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/wellingtonRegion/ask");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;