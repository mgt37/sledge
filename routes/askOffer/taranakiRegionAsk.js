var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    TaranakiRegionAsk       = require("../../app/models/askOffer/taranakiRegionAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        TaranakiRegionAsk.find({title: regex}, function(err, allTaranakiRegionAsk){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allTaranakiRegionAsk.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/taranakiRegion/ask/index", {taranakiRegionAsk: allTaranakiRegionAsk, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        TaranakiRegionAsk.find({}, function(err, allTaranakiRegionAsk){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/taranakiRegion/ask/index", {taranakiRegionAsk: allTaranakiRegionAsk, noMatch: noMatch});
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
    var newTaranakiRegionAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    TaranakiRegionAsk.create(newTaranakiRegionAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/taranakiRegion/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/taranakiRegion/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    TaranakiRegionAsk.findById(req.params.id).populate("comments").exec(function(err, foundTaranakiRegionAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/taranakiRegion/ask/show", {taranakiRegionAsk: foundTaranakiRegionAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkTaranakiRegionAskOwnership, function(req, res){
    TaranakiRegionAsk.findById(req.params.id, function(err, foundTaranakiRegionAsk){
        if(err){
            res.redirect("/askOffer/taranakiRegion/ask/index");
        } else {
            res.render("askOffer/taranakiRegion/ask/edit", {taranakiRegionAsk: foundTaranakiRegionAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkTaranakiRegionAskOwnership, function(req, res){
    // Find and update the ask
    TaranakiRegionAsk.findByIdAndUpdate(req.params.id, req.body.taranakiRegionAsk, function(err, updatedTaranakiRegionAsk){
        if(err){
            res.redirect("/askOffer/taranakiRegion/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/taranakiRegion/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkTaranakiRegionAskOwnership, function(req, res){
    TaranakiRegionAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/taranakiRegion/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/taranakiRegion/ask");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;