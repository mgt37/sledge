var express           = require("express"),
    router            = express(),
    Liquor            = require("../../app/models/uniTalk/liquor"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    // Get all uniTalk from DB
    Liquor.find({}, function(err, allLiquor){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/liquor/index", {liquor: allLiquor});
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
    var newLiquor = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    Liquor.create(newLiquor, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/liquor");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/liquor/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Liquor.findById(req.params.id).populate("comments").exec(function(err, foundLiquor){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/liquor/show", {liquor: foundLiquor});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkLiquorOwnership, function(req, res){
    Liquor.findById(req.params.id, function(err, foundLiquor){
        if(err){
            res.redirect("/uniTalk/liquor");
        } else {
            res.render("uniTalk/liquor/edit", {liquor: foundLiquor});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkLiquorOwnership, function(req, res){
    // Find and update the correct topic
    Liquor.findByIdAndUpdate(req.params.id, req.body.liquor, function(err, updatedLiquor){
        if(err){
            res.redirect("/uniTalk/liquor");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/liquor/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkLiquorOwnership, function(req, res){
    Liquor.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/liquor");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/liquor");
        }
    });
});

module.exports = router;