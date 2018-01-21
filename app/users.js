var express    = require("express");
var router     = express.Router();
var passport   = require("passport");
var User       = require("../app/models/user");
var middleware = require("../middleware/index"); //check that this is not interfering (extra line of code)

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    }); 

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.getUserById(id, function(err, user) {
            done(err, user);
        });
    });

// Root route
/*router.get("/", function(req, res){
    res.render("landing");
});*/

// Show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

// Handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            /*req.flash("error", err.message);*/
            return res.render("register");
        }
    });
});

// Show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

// Handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/profile",
        failureRedirect: "/login"
    }), function(req, res){
});

// Logout route
router.get("/logout", function(req, res){
    req.logout();
    /*req.flash("success", "Logged you out");*/
    res.redirect("/home");
});

// PROFILE 
	router.get('/profile', middleware.isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user
		});
	});

module.exports = router;