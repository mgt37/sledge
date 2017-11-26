var express    = require("express");
var router     = express.Router();
var passport   = require("passport");
var User       = require("../models/user");

// Landing page route
router.get("/", function(req, res){
    res.render("landing");
});

//Home route
router.get("/home", function(req, res){
    res.render("home");
});

// Show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

// Handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, user_type: req.body.user_type});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Sledge " + user.username);
            res.redirect("/home");
        });
    });
});

// Show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

// Handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/home",
        failureRedirect: "/login"
    }), function(req, res){
});

// Logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/home");
});

// Show our vision page
router.get("/our_vision", function(req, res){
   res.render("our_vision"); 
});

// Show about us page
router.get("/about_us", function(req, res){
   res.render("about_us"); 
});

// Show FAQ page
router.get("/FAQ", function(req, res){
   res.render("FAQ"); 
});

// Show contact us page
router.get("/contact_us", function(req, res){
   res.render("contact_us"); 
});

module.exports = router;