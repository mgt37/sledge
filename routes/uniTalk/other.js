var express           = require("express"),
    router            = express(),
    Other            = require("../../app/models/uniTalk/other"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    // Get all uniTalk from DB
    Other.find({}, function(err, allOther){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/other/index", {other: allOther});
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
    var newOther = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    Other.create(newOther, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/other");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/other/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Other.findById(req.params.id).populate("comments").exec(function(err, foundOther){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/other/show", {other: foundOther});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkOtherOwnership, function(req, res){
    Other.findById(req.params.id, function(err, foundOther){
        if(err){
            res.redirect("/uniTalk/other");
        } else {
            res.render("uniTalk/other/edit", {other: foundOther});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkOtherOwnership, function(req, res){
    // Find and update the correct topic
    Other.findByIdAndUpdate(req.params.id, req.body.other, function(err, updatedOther){
        if(err){
            res.redirect("/uniTalk/other");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/other/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkOtherOwnership, function(req, res){
    Other.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/other");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/other");
        }
    });
});

module.exports = router;