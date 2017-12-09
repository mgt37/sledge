// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '180314355894068', // your App ID
        'clientSecret'  : '59691aba0caf0fd1759cd8daedd3e0e3', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey'       : '6Mqcdv356XM37U90lvyfL1NUd',
        'consumerSecret'    : 'Fn8Wla5kkq7gb7igwStMjRnk7fsGmEA5i6WGuyd6c4XITnOutW',
        'callbackURL'       : 'http://127.0.0.1:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};