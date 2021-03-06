var express           = require("express"),
    router            = express(),
    Party            = require("../../app/models/uniTalk/party"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        Party.find({title: regex}, function(err, allParties){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allParties.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("uniTalk/party/index", {parties: allParties, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        Party.find({}, function(err, allParties){
            if(err){
                console.log(err);
            } else {
                res.render("uniTalk/party/index", {parties: allParties, noMatch: noMatch});
            }
        });
    }
});

//CREATE - add new uniTalk topic to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to uniTalk topics array
    var title  = req.body.title;
    var body   = req.body.body;
    var image  = req.body.image;
    var author = {
        id: req.user._id,
        username:  req.user.local.username || req.user.facebook.name || req.user.twitter.username || req.user.google.name
    };
    var newParty = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    Party.create(newParty, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/party");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/party/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Party.findById(req.params.id).populate("comments").exec(function(err, foundParty){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/party/show", {party: foundParty});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkPartyOwnership, function(req, res){
    Party.findById(req.params.id, function(err, foundParty){
        if(err){
            res.redirect("/uniTalk/party");
        } else {
            res.render("uniTalk/party/edit", {party: foundParty});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkPartyOwnership, function(req, res){
    // Find and update the correct topic
    Party.findByIdAndUpdate(req.params.id, req.body.party, function(err, updatedParty){
        if(err){
            res.redirect("/uniTalk/party");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/party/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkPartyOwnership, function(req, res){
    Party.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/party");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/party");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;