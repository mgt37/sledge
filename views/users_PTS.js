var express          = require("express");
var router           = express.Router();
var User             = require ('../app/models/user');
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var middleware       = require("../middleware/index"); //check that this is not interfering (extra line of code)

//Register
router.get('/register', function (req, res){
    res.render('register');
});

//Login
router.get('/login', function (req, res){
    res.render('login');
});

//Register User
router.post('/register', function (req, res){
    var name = req.body.name;                          
	var email = req.body.email;                        
	var username = req.body.username;                  
	var password = req.body.password;                  
	var password2 = req.body.password2;
	
	// Validation
	
	req.checkBody('name').notEmpty(); //removed flash messages due to error
	req.checkBody('email').notEmpty();
	req.checkBody('email').isEmail();
	req.checkBody('username').notEmpty();
	req.checkBody('password').notEmpty();
	req.checkBody('password2').equals(req.body.password);

	/*req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);*/
	
	var errors = req.validationErrors();
	
	if(errors){
	    res.render('register', {
		errors: errors 
	    });
	}	else {
		var newUser = new User({
			name     : name,
			email    : email,
			username : username,
			password : password
	});
		
		
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
		
		/*req.flash('success_msg', 'You are registered and can now login');*/
		res.redirect('/login');
	}	
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function (err, user){
       if(err) throw err;
       if(!user) {
           return done(null, false); 
           /*{message: 'Unknown User'});*/
       }
       
        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
               return done(null, user);
          } else {
               return done(null, false);
               /*, {message: 'Invalid password'});*/
          }
        });
   });
}));
  
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

// process the login form
		router.post('/login',
		passport.authenticate('local', { //was 'local-login previously' -- check this
		    successRedirect: '/profile',
        	failureRedirect: '/login',
        	/*failureFlash: true*/
		}),
		function(req, res){
		res.redirect('/home');
	});

 // PROFILE 
	router.get('/profile', middleware.isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user
		});
	});

	// LOGOUT ==============================
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/home');
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================
		// SIGNUP =================================
		
		// process the signup form
		/*router.post('/register', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/register', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));*/

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN) =============
// =============================================================================
	// locally --------------------------------
		/*router.get('/connect/local', function(req, res) {
			res.render('connect-local');*/
		/*	, { message: req.flash('loginMessage') });*/
		/*});*/
		/*router.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile',*/ // redirect to the secure profile section
			/*failureRedirect : '/connect/local',*/ // redirect back to the signup page if there is an error
			/*failureFlash : true*/ // allow flash messages
		/*}));*/

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. 
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	router.get('/unlink/user', function(req, res) { //was '/unlink/local' from previous
		var User            = req.user;
		User.username = undefined;
		User.email    = undefined;
		User.password = undefined;
		User.save(function(err) {
			if(err){ 
				throw err;
		} else {
			res.redirect('/profile');
		}
		});
	});
	
	
//---------------------------------------------------------------------------//
//CODE FOR INDEX.JS FILE IN EXAMPLE (NOT ADDING SEPARATE FILE)
//---------------------------------------------------------------------------//
router.get('/home', ensureAuthenticated, function(req, res){ // shows as '/' in example -- check this
	res.render('home');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}	
//---------------------------------------------------------------------------//	
	
//---------------------------------------------------------------------------//
	
module.exports = router;