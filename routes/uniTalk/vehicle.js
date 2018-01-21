var express           = require("express"),
    router            = express(),
    Vehicle           = require("../../app/models/uniTalk/vehicle"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        Vehicle.find({title: regex}, function(err, allVehicle){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allVehicle.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("uniTalk/vehicle/index", {vehicle: allVehicle, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        Vehicle.find({}, function(err, allVehicle){
            if(err){
                console.log(err);
            } else {
                res.render("uniTalk/vehicle/index", {vehicle: allVehicle, noMatch: noMatch});
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
    var newVehicle = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    Vehicle.create(newVehicle, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/vehicle");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/vehicle/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    Vehicle.findById(req.params.id).populate("comments").exec(function(err, foundVehicle){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/vehicle/show", {vehicle: foundVehicle});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkVehicleOwnership, function(req, res){
    Vehicle.findById(req.params.id, function(err, foundVehicle){
        if(err){
            res.redirect("/uniTalk/vehicle");
        } else {
            res.render("uniTalk/vehicle/edit", {vehicle: foundVehicle});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkVehicleOwnership, function(req, res){
    // Find and update the correct topic
    Vehicle.findByIdAndUpdate(req.params.id, req.body.vehicle, function(err, updatedVehicle){
        if(err){
            res.redirect("/uniTalk/vehicle");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/vehicle/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkVehicleOwnership, function(req, res){
    Vehicle.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/vehicle");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/vehicle");
        }
    });
});

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;