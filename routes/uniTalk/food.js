var express           = require("express"),
    router            = express(),
    Food            = require("../../app/models/uniTalk/food"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    // Get all uniTalk from DB
    Food.find({}, function(err, allFood){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/food/index", {food: allFood});
        }
    });
});

//CREATE - add new uniTalk topic to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to uniTalk topics array
    var title  = req.body.title;
    var body   = req.body.body;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newFood = ({title: title, body: body, author: author});
    //create a new uniTalk topic and save to DB
    Food.create(newFood, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/food");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/food/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Food.findById(req.params.id).populate("comments").exec(function(err, foundFood){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/food/show", {food: foundFood});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkFoodOwnership, function(req, res){
    Food.findById(req.params.id, function(err, foundFood){
        if(err){
            res.redirect("/uniTalk/food");
        } else {
            res.render("uniTalk/food/edit", {food: foundFood});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkFoodOwnership, function(req, res){
    // Find and update the correct topic
    Food.findByIdAndUpdate(req.params.id, req.body.food, function(err, updatedFood){
        if(err){
            res.redirect("/uniTalk/food");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/food/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkFoodOwnership, function(req, res){
    Food.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/food");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/food");
        }
    });
});

module.exports = router;