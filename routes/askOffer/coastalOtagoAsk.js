var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    CoastalOtagoAsk       = require("../../app/models/askOffer/coastalOtagoAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        CoastalOtagoAsk.find({title: regex}, function(err, allCoastalOtagoAsk){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allCoastalOtagoAsk.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/coastalOtago/ask/index", {coastalOtagoAsk: allCoastalOtagoAsk, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        CoastalOtagoAsk.find({}, function(err, allCoastalOtagoAsk){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/coastalOtago/ask/index", {coastalOtagoAsk: allCoastalOtagoAsk, noMatch: noMatch});
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
    var newCoastalOtagoAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    CoastalOtagoAsk.create(newCoastalOtagoAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/coastalOtago/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/coastalOtago/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    CoastalOtagoAsk.findById(req.params.id).populate("comments").exec(function(err, foundCoastalOtagoAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/coastalOtago/ask/show", {coastalOtagoAsk: foundCoastalOtagoAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkCoastalOtagoAskOwnership, function(req, res){
    CoastalOtagoAsk.findById(req.params.id, function(err, foundCoastalOtagoAsk){
        if(err){
            res.redirect("/askOffer/coastalOtago/ask/index");
        } else {
            res.render("askOffer/coastalOtago/ask/edit", {coastalOtagoAsk: foundCoastalOtagoAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkCoastalOtagoAskOwnership, function(req, res){
    // Find and update the ask
    CoastalOtagoAsk.findByIdAndUpdate(req.params.id, req.body.coastalOtagoAsk, function(err, updatedCoastalOtagoAsk){
        if(err){
            res.redirect("/askOffer/coastalOtago/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/coastalOtago/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkCoastalOtagoAskOwnership, function(req, res){
    CoastalOtagoAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/coastalOtago/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/coastalOtago/ask");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;