var express           = require("express"),
    router            = express(),
    FashionMale       = require("../../app/models/uniTalk/fashionMale"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        FashionMale.find({title: regex}, function(err, allFashionMale){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allFashionMale.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("uniTalk/fashionMale/index", {fashionMale: allFashionMale, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        FashionMale.find({}, function(err, allFashionMale){
            if(err){
                console.log(err);
            } else {
                res.render("uniTalk/fashionMale/index", {fashionMale: allFashionMale, noMatch: noMatch});
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
    var newFashionMale = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    FashionMale.create(newFashionMale, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/fashionMale");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/fashionMale/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    FashionMale.findById(req.params.id).populate("comments").exec(function(err, foundFashionMale){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/fashionMale/show", {fashionMale: foundFashionMale});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkFashionMaleOwnership, function(req, res){
    FashionMale.findById(req.params.id, function(err, foundFashionMale){
        if(err){
            res.redirect("/uniTalk/fashionMale");
        } else {
            res.render("uniTalk/fashionMale/edit", {fashionMale: foundFashionMale});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkFashionMaleOwnership, function(req, res){
    // Find and update the correct topic
    FashionMale.findByIdAndUpdate(req.params.id, req.body.fashionMale, function(err, updatedFashionMale){
        if(err){
            res.redirect("/uniTalk/fashionMale");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/fashionMale/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkFashionMaleOwnership, function(req, res){
    FashionMale.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/fashionMale");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/fashionMale");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;