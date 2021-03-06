var express           = require("express"),
    router            = express(),
    Sex               = require("../../app/models/uniTalk/sex"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        Sex.find({title: regex}, function(err, allSex){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allSex.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("uniTalk/sex/index", {sex: allSex, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        Sex.find({}, function(err, allSex){
            if(err){
                console.log(err);
            } else {
                res.render("uniTalk/sex/index", {sex: allSex, noMatch: noMatch});
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
    var newSex = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    Sex.create(newSex, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/sex");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/sex/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Sex.findById(req.params.id).populate("comments").exec(function(err, foundSex){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/sex/show", {sex: foundSex});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkSexOwnership, function(req, res){
    Sex.findById(req.params.id, function(err, foundSex){
        if(err){
            res.redirect("/uniTalk/sex");
        } else {
            res.render("uniTalk/sex/edit", {sex: foundSex});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkSexOwnership, function(req, res){
    // Find and update the correct topic
    Sex.findByIdAndUpdate(req.params.id, req.body.sex, function(err, updatedSex){
        if(err){
            res.redirect("/uniTalk/sex");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/sex/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkSexOwnership, function(req, res){
    Sex.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/sex");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/sex");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;