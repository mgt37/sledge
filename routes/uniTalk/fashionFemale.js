var express           = require("express"),
    router            = express(),
    FashionFemale     = require("../../app/models/uniTalk/fashionFemale"),
    middleware        = require("../../middleware"),
    uniTalkMiddleware = require("../../middleware/uniTalk");
    /*applic            = require("../../app.js");*/

//INDEX - Show all uniTalk topics
router.get("/", function(req, res){
    var noMatch = null;
    /*eval(require('locus'));*/
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all uniTalk from DB
        FashionFemale.find({title: regex}, function(err, allFashionFemale){ //Change from name to other variable?
            if(err){
                console.log(err);
            } else {
                if(allFashionFemale.length <1){
                    noMatch = 'No titles match that query. Please try again.';
                }
                res.render("uniTalk/fashionFemale/index", {fashionFemale: allFashionFemale, noMatch: noMatch});
            }
        });    
    } else {
        /*eval(require('locus'));*/
        // Get all uniTalk from DB
        FashionFemale.find({}, function(err, allFashionFemale){
            if(err){
                console.log(err);
            } else {
                res.render("uniTalk/fashionFemale/index", {fashionFemale: allFashionFemale, noMatch: noMatch});
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
    var newFashionFemale = ({title: title, body: body, image: image, author: author});
    //create a new uniTalk topic and save to DB
    FashionFemale.create(newFashionFemale, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to uniTalk page
            res.redirect("/uniTalk/fashionFemale");
        }
    });
});

//NEW - Show form to create new uniTalk topic
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("uniTalk/fashionFemale/new");
});

//SHOW - Shows more information about one uniTalk topic
router.get("/:id", function(req, res){
    //Find the uniTalk topic with provided ID
    FashionFemale.findById(req.params.id).populate("comments").exec(function(err, foundFashionFemale){
        if(err){
            console.log(err);
        } else {
            //Render show template with that uniTalk topic
            res.render("uniTalk/fashionFemale/show", {fashionFemale: foundFashionFemale});    
        }
    });
});

// EDIT uniTalk Topic Route
router.get("/:id/edit", uniTalkMiddleware.checkFashionFemaleOwnership, function(req, res){
    FashionFemale.findById(req.params.id, function(err, foundFashionFemale){
        if(err){
            res.redirect("/uniTalk/fashionFemale");
        } else {
            res.render("uniTalk/fashionFemale/edit", {fashionFemale: foundFashionFemale});
        }
    });
});

// UPDATE uniTalk Topic Route
router.put("/:id", uniTalkMiddleware.checkFashionFemaleOwnership, function(req, res){
    // Find and update the correct topic
    FashionFemale.findByIdAndUpdate(req.params.id, req.body.fashionFemale, function(err, updatedFashionFemale){
        if(err){
            res.redirect("/uniTalk/fashionFemale");
        } else {
            // Redirect to show page
            res.redirect("/uniTalk/fashionFemale/" + req.params.id);
        }
    });
});

// DESTROY uniTalk Topic Route
router.delete("/:id", uniTalkMiddleware.checkFashionFemaleOwnership, function(req, res){
    FashionFemale.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/uniTalk/fashionFemale");
        } else {
            req.flash("success", "uniTalk topic deleted");
            res.redirect("/uniTalk/fashionFemale");
        }
    });
});

/*router.post('/upload', (req, res) => {
  applic.upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('new', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});*/

function escapeRegex(text){
   return text.replace(/[-[\]{}()* +?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;