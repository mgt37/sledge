var express           = require("express"),
    router            = express(),
    Flatting          = require("../../app/models/uniTalk/flatting"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    // Get all uniTalk from DB
    Flatting.find({}, function(err, allFlatting){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/flatting/index", {flatting: allFlatting});
        }
    });
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
    var newFlatting = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    Flatting.create(newFlatting, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/flatting");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/flatting/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Flatting.findById(req.params.id).populate("comments").exec(function(err, foundFlatting){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/flatting/show", {flatting: foundFlatting});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkFlattingOwnership, function(req, res){
    Flatting.findById(req.params.id, function(err, foundFlatting){
        if(err){
            res.redirect("/uniTalk/flatting");
        } else {
            res.render("uniTalk/flatting/edit", {flatting: foundFlatting});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkFlattingOwnership, function(req, res){
    // Find and update the correct topic
    Flatting.findByIdAndUpdate(req.params.id, req.body.flatting, function(err, updatedFlatting){
        if(err){
            res.redirect("/uniTalk/flatting");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/flatting/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkFlattingOwnership, function(req, res){
    Flatting.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/flatting");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/flatting");
        }
    });
});

module.exports = router;