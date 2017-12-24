var express           = require("express"),
    router            = express(),
    Relationship      = require("../../app/models/uniTalk/relationship"),
    middleware        = require("../../middleware"),
    uniTalkmiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    // Get all uniTalk from DB
    Relationship.find({}, function(err, allRelationships){
        if(err){
            console.log(err);
        } else {
            res.render("uniTalk/relationship/index", {relationships: allRelationships});
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
    var newRelationship = ({title: title, body: body, author: author});
    //create a new uniTalk topic and save to DB
    Relationship.create(newRelationship, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/relationship");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/relationship/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Relationship.findById(req.params.id).populate("comments").exec(function(err, foundRelationship){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/relationship/show", {relationship: foundRelationship});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkmiddleware.checkRelationshipOwnership, function(req, res){
    Relationship.findById(req.params.id, function(err, foundRelationship){
        if(err){
            res.redirect("/uniTalk/relationship");
        } else {
            res.render("uniTalk/relationship/edit", {relationship: foundRelationship});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkmiddleware.checkRelationshipOwnership, function(req, res){
    // Find and update the correct topic
    Relationship.findByIdAndUpdate(req.params.id, req.body.relationship, function(err, updatedRelationship){
        if(err){
            res.redirect("/uniTalk/relationship");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/relationship/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkmiddleware.checkRelationshipOwnership, function(req, res){
    Relationship.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/relationship");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/relationship");
        }
    });
});

module.exports = router;