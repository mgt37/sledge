var express           = require("express"),
    router            = express(),
    timestamp         = require('time-stamp'),
    HamiltonAsk       = require("../../app/models/askOffer/hamiltonAsk"),
    middleware        = require("../../middleware"),
    askOfferMiddleware = require("../../middleware/askOffer");
    
    
//INDEX - Show all asks
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        HamiltonAsk.find({title: regex}, function(err, allHamiltonAsk){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allHamiltonAsk.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("askOffer/hamilton/ask/index", {hamiltonAsk: allHamiltonAsk, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        HamiltonAsk.find({}, function(err, allHamiltonAsk){
            if(err){
                console.log(err);
            } else {
                res.render("askOffer/hamilton/ask/index", {hamiltonAsk: allHamiltonAsk, noMatch: noMatch});
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
    var newHamiltonAsk = ({title: title, body: body, hourlyRate: hourlyRate, contactEmail: contactEmail, otherContact: otherContact, author: author});
    //create a new ask and save to DB
    HamiltonAsk.create(newHamiltonAsk, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to main page
            res.redirect("/askOffer/hamilton/ask");
        }
    });
});

//NEW - Show form to create new ask
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("askOffer/hamilton/ask/new");
});

//SHOW - Shows more information about one ask
router.get("/:id", function(req, res){
    //Find the ask with provided ID
    HamiltonAsk.findById(req.params.id).populate("comments").exec(function(err, foundHamiltonAsk){
        if(err){
            console.log(err);
        } else {
            //Render show template with that ask
            res.render("askOffer/hamilton/ask/show", {hamiltonAsk: foundHamiltonAsk});    
        }
    });
});

// EDIT Ask Route
router.get("/:id/edit", askOfferMiddleware.checkHamiltonAskOwnership, function(req, res){
    HamiltonAsk.findById(req.params.id, function(err, foundHamiltonAsk){
        if(err){
            res.redirect("/askOffer/hamilton/ask/index");
        } else {
            res.render("askOffer/hamilton/ask/edit", {hamiltonAsk: foundHamiltonAsk});
        }
    });
});

// UPDATE Ask Route
router.put("/:id", askOfferMiddleware.checkHamiltonAskOwnership, function(req, res){
    // Find and update the ask
    HamiltonAsk.findByIdAndUpdate(req.params.id, req.body.hamiltonAsk, function(err, updatedHamiltonAsk){
        if(err){
            res.redirect("/askOffer/hamilton/ask/index");
        } else {
            // Redirect to show page
            res.redirect("/askOffer/hamilton/ask/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", askOfferMiddleware.checkHamiltonAskOwnership, function(req, res){
    HamiltonAsk.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/askOffer/hamilton/ask");
        } else {
            req.flash("success", "ask deleted");
            res.redirect("/askOffer/hamilton/ask");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;