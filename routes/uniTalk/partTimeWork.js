var express           = require("express"),
    router            = express(),
    PartTimeWork      = require("../../app/models/uniTalk/partTimeWork"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        PartTimeWork.find({title: regex}, function(err, allPartTimeWork){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allPartTimeWork.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("uniTalk/partTimeWork/index", {partTimeWork: allPartTimeWork, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        PartTimeWork.find({}, function(err, allPartTimeWork){
            if(err){
                console.log(err);
            } else {
                res.render("uniTalk/partTimeWork/index", {partTimeWork: allPartTimeWork, noMatch: noMatch});
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
    var newPartTimeWork = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    PartTimeWork.create(newPartTimeWork, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/partTimeWork");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/partTimeWork/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    PartTimeWork.findById(req.params.id).populate("comments").exec(function(err, foundPartTimeWork){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/partTimeWork/show", {partTimeWork: foundPartTimeWork});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkPartTimeWorkOwnership, function(req, res){
    PartTimeWork.findById(req.params.id, function(err, foundPartTimeWork){
        if(err){
            res.redirect("/uniTalk/partTimeWork");
        } else {
            res.render("uniTalk/partTimeWork/edit", {partTimeWork: foundPartTimeWork});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkPartTimeWorkOwnership, function(req, res){
    // Find and update the correct topic
    PartTimeWork.findByIdAndUpdate(req.params.id, req.body.partTimeWork, function(err, updatedPartTimeWork){
        if(err){
            res.redirect("/uniTalk/partTimeWork");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/partTimeWork/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkPartTimeWorkOwnership, function(req, res){
    PartTimeWork.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/partTimeWork");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/partTimeWork");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;