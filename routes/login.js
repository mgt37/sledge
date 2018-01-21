/*var express    = require("express");
var router     = express.Router("./app");
var passport   = require("passport");
var User       = require("../app/models/user");
var middleware = require("../middleware/index");*/


/*var configPassport = require('../config/passport');
var configAuth = require('../config/auth');*/

// load all the things we need
/*var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;*/

/*module.exports = function(app, passport) {*/

// normal routes ===============================================================

	// show the home page (will also have our login links)
/*	router.get('/home', function(req, res) {
		res.render('home');
	});*/

	// PROFILE SECTION =========================
	/*router.get('/profile', middleware.isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user
		});
	});*/

	// LOGOUT ==============================
	/*router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/home');
	});*/

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		/*router.get('/login', function(req, res) {
			res.render('login');*/
		/*	 { message: req.flash('loginMessage') });*/
		/*});*/

		// process the login form
		/*router.post('/login', passport.authenticate('local', {
        	successRedirect: '/profile',
        	failureRedirect: '/login',
    		}), function(req, res){*/
    		/*	res.redirect('/users/' + req.user.username);*/
	/*	});*/

		// SIGNUP =================================
		
		// show the signup form
		/*router.get('/register', function(req, res) {*/
			/*res.render('register');*/
		/*	 { message: req.flash('loginMessage') });*/
		/*});*/
		
		// Handle sign up logic
		/*router.post("/register", function(req, res){
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
		});*/
		
		

		// process the signup form
		/*router.post('/register', passport.authenticate('local-signup', {*/
			/*successRedirect : '/profile',*/ // redirect to the secure profile section
			/*failureRedirect : '/register',*/ // redirect back to the signup page if there is an error
			/*failureFlash : true*/ // allow flash messages
		/*));*/

	// facebook -------------------------------

		// send to facebook to do the authentication
		/*router.get('/auth/facebook', passport.authenticate('facebook'));*/

		// handle the callback after facebook has authenticated the user
		/*router.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));*/

	// twitter --------------------------------

		// send to twitter to do the authentication
		/*router.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));*/

		// handle the callback after twitter has authenticated the user
		/*router.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));*/


	// google ---------------------------------

		// send to google to do the authentication
		/*router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));*/

		// the callback after google has authenticated the user
		/*router.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));*/

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
	/*	router.get('/connect/local', function(req, res) {
			res.render('connect-local');*/
		/*	, { message: req.flash('loginMessage') });*/
		/*});*/
		/*router.post('/connect/local', passport.authenticate('local-signup', {*/
		/*	successRedirect : '/profile',*/ // redirect to the secure profile section
		/*	failureRedirect : '/connect/local',*/ // redirect back to the signup page if there is an error
			/*failureFlash : true*/ // allow flash messages
		/*}));*/

	// facebook -------------------------------

		// send to facebook to do the authentication
		/*router.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));*/

		// handle the callback after facebook has authorized the user
		/*router.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));*/

	// twitter --------------------------------

		// send to twitter to do the authentication
	/*	router.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));*/

		// handle the callback after twitter has authorized the user
		/*router.get('/connect/twitter/callback',
			passport.authorize('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));*/


	// google ---------------------------------

		// send to google to do the authentication
		/*router.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));*/

		// the callback after google has authorized the user
		/*router.get('/connect/google/callback',
			passport.authorize('google', {
				successRedirect : '/profile',
				failureRedirect : '/home'
			}));*/

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	/*router.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});*/

	// facebook -------------------------------
	/*router.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});*/

	// twitter --------------------------------
	/*router.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});*/

	// google ---------------------------------
	/*router.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});*/


/*};*/
/*module.exports = router;*/