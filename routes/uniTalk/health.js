var express           = require("express"),
    router            = express(),
    Health            = require("../../app/models/uniTalk/health"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        Health.find({title: regex}, function(err, allHealth){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allHealth.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("uniTalk/health/index", {health: allHealth, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        Health.find({}, function(err, allHealth){
            if(err){
                console.log(err);
            } else {
                res.render("uniTalk/health/index", {health: allHealth, noMatch: noMatch});
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
    var newHealth = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    Health.create(newHealth, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/health");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/health/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Health.findById(req.params.id).populate("comments").exec(function(err, foundHealth){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/health/show", {health: foundHealth});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkHealthOwnership, function(req, res){
    Health.findById(req.params.id, function(err, foundHealth){
        if(err){
            res.redirect("/uniTalk/health");
        } else {
            res.render("uniTalk/health/edit", {health: foundHealth});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkHealthOwnership, function(req, res){
    // Find and update the correct topic
    Health.findByIdAndUpdate(req.params.id, req.body.health, function(err, updatedHealth){
        if(err){
            res.redirect("/uniTalk/health");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/health/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkHealthOwnership, function(req, res){
    Health.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/health");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/health");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;