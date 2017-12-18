var express    = require("express");
var router     = express.Router();
var passport   = require("passport");
var User       = require("../app/models/user");
var middleware = require("../middleware/index");
var app        = require('../app');

var configPassport = require('../config/passport');
var configAuth = require('../config/auth');

module.exports = function(applic, passport) {

// normal routes ===============================================================

	// show the home page (will also have our login links)
	applic.get('/home', function(req, res) {
		res.render('home');
	});

	// PROFILE SECTION =========================
	applic.get('/profile', middleware.isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user
		});
	});

	// LOGOUT ==============================
	applic.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/home');
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		applic.get('/login', function(req, res) {
			res.render('login');
		/*	 { message: req.flash('loginMessage') });*/
		});

		// process the login form
		applic.post('/login', passport.authenticate('local-login', {
        	successRedirect: '/profile',
        	failureRedirect: '/login',
    		}), function(req, res){
    		/*	res.redirect('/users/' + req.user.username);*/
		});
		
		/*applic.get('/login', function(req, res, next) {
		  passport.authenticate('local', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { return res.redirect('/login'); }
		    req.logIn(user, function(err) {
		      if (err) { return next(err); }
		      return res.redirect('/users/' + user.username);
		    });
		  })(req, res, next);
		});*/
		
		/*applic.post('/login', passport.authenticate('local-login', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			/*failureFlash : true*/ // allow flash messages
		/*}));*/

		// SIGNUP =================================
		
		// show the signup form
		applic.get('/register', function(req, res) {
			res.render('register');
		/*	 { message: req.flash('loginMessage') });*/
		});
		
		// Handle sign up logic
		/*applic.post("/register", function(req, res){
			 var newUser = new User({username: req.body.username});
			 User.register(newUser, req.body.password, function(err, user){
			    if(err){*/
			        /*req.flash("error", err.message);*/
			        /*return res.render("register");
			        }
			    passport.authenticate("local")(req, res, function(){
			        req.flash("success", "Welcome to Sledge " + user.username);
			        res.redirect("/home");
			    });
			});
		})*/;

		// process the signup form
		applic.post('/register', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/register', // redirect back to the signup page if there is an error
			/*failureFlash : true*/ // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		applic.get('/auth/facebook', passport.authenticate('facebook'));

		// handle the callback after facebook has authenticated the user
		applic.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		applic.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		applic.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		applic.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		applic.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		applic.get('/connect/local', function(req, res) {
			res.render('connect-local');
		/*	, { message: req.flash('loginMessage') });*/
		});
		applic.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			/*failureFlash : true*/ // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		applic.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		applic.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		applic.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

		// handle the callback after twitter has authorized the user
		applic.get('/connect/twitter/callback',
			passport.authorize('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));


	// google ---------------------------------

	// send to google to do the authentication
		applic.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

		// the callback after google has authorized the user
		applic.get('/connect/google/callback',
			passport.authorize('google', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	applic.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// facebook -------------------------------
	applic.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// twitter --------------------------------
	applic.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// google ---------------------------------
	applic.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});
};

/*module.exports = router;*/