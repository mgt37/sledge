var express           = require("express"),
    router            = express(),
    Money            = require("../../app/models/uniTalk/money"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    // Get all uniTalk from DB
    Money.find({}, function(err, allMoney){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/money/index", {money: allMoney});
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
    var newMoney = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    Money.create(newMoney, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/money");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/money/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Money.findById(req.params.id).populate("comments").exec(function(err, foundMoney){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/money/show", {money: foundMoney});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkMoneyOwnership, function(req, res){
    Money.findById(req.params.id, function(err, foundMoney){
        if(err){
            res.redirect("/uniTalk/money");
        } else {
            res.render("uniTalk/money/edit", {money: foundMoney});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkMoneyOwnership, function(req, res){
    // Find and update the correct topic
    Money.findByIdAndUpdate(req.params.id, req.body.money, function(err, updatedMoney){
        if(err){
            res.redirect("/uniTalk/money");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/money/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkMoneyOwnership, function(req, res){
    Money.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/money");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/money");
        }
    });
});

module.exports = router;