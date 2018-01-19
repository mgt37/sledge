var express          = require("express"),
    User             = require('../app/models/user'),
    Social           = require('../app/models/social'),
    configAuth       = require('./auth'), // use this one for testing
    LocalStrategy    = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy  = require('passport-twitter').Strategy,
    GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    /*passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password, done) {

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'username' :  username }, function(err, user) { // was { 'local.username' :  username }
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else
                    return done(null, user);
            });
        });
    }));*/

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    /*passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true*/ // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    /*},
    function(req, username, password, done) {*/

        // asynchronous
        /*process.nextTick(function() {*/

            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the username is in use.
            /*User.findOne({'username': username}, function(err, existingUser) {*/ // was { 'local.username' :  username }

                // if there are any errors, return the error
                /*if (err)
                    return done(err);

                // check to see if there's already a user with that email
                if (existingUser) 
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));

                //  If we're logged in, we're connecting a new local account.
                if(req.user) {
                    var user            = req.local.user; // was req.user
                    user.local.username = username;
                    user.local.password = user.generateHash(password);
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                } */
                //  We're not logged in, so we're creating a brand new user.
                /*else {*/
                    // create the user
                    /*var newUser            = new User();

                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));*/

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.social) {

                Social.findOne({ 'facebook.id' : profile.id }, function(err, social) {
                    if (err)
                        return done(err);

                    if (social) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!social.facebook.token) {
                            social.facebook.token = token;
                            social.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            social.facebook.email = profile.emails[0].value;

                            social.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, social);
                            });
                        }

                        return done(null, social); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newSocial            = new Social();

                        newSocial.facebook.id    = profile.id;
                        newSocial.facebook.token = token;
                        newSocial.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newSocial.facebook.email = profile.emails[0].value;

                        newSocial.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newSocial);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var social            = req.social; // pull the user out of the session

                social.facebook.id    = profile.id;
                social.facebook.token = token;
                social.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                social.facebook.email = profile.emails[0].value;

                social.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, social);
                });

            }
        });

    }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, tokenSecret, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.social) {

                Social.findOne({ 'twitter.id' : profile.id }, function(err, social) {
                    if (err)
                        return done(err);

                    if (social) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!social.twitter.token) {
                            social.twitter.token       = token;
                            social.twitter.username    = profile.username;
                            social.twitter.displayName = profile.displayName;

                            social.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, social);
                            });
                        }

                        return done(null, social); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newSocial                 = new Social();

                        newSocial.twitter.id          = profile.id;
                        newSocial.twitter.token       = token;
                        newSocial.twitter.username    = profile.username;
                        newSocial.twitter.displayName = profile.displayName;

                        newSocial.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newSocial);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var social                 = req.social; // pull the user out of the session

                social.twitter.id          = profile.id;
                social.twitter.token       = token;
                social.twitter.username    = profile.username;
                social.twitter.displayName = profile.displayName;

                social.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, social);
                });
            }
        });
    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.social) {

                Social.findOne({ 'google.id' : profile.id }, function(err, social) {
                    if (err)
                        return done(err);

                    if (social) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!social.google.token) {
                            social.google.token = token;
                            social.google.name  = profile.displayName;
                            social.google.email = profile.emails[0].value; // pull the first email

                            social.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, social);
                            });
                        }

                        return done(null, social);
                    } else {
                        var newSocial          = new Social();

                        newSocial.google.id    = profile.id;
                        newSocial.google.token = token;
                        newSocial.google.name  = profile.displayName;
                        newSocial.google.email = profile.emails[0].value; // pull the first email

                        newSocial.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newSocial);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var social               = req.social; // pull the user out of the session

                social.google.id    = profile.id;
                social.google.token = token;
                social.google.name  = profile.displayName;
                social.google.email = profile.emails[0].value; // pull the first email

                social.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, social);
                });
            }
        });
    }));
};