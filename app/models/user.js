<<<<<<< HEAD
<<<<<<< HEAD
var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    /*email: String,*/ //Add email and name fields
    /*name: String,*/
    password: String
});

userSchema.plugin(passportLocalMongoose);

=======
=======
>>>>>>> parent of bf74a83... Added some social places, waiting to solve login error etc.
// load the things we need
var mongoose              = require('mongoose');
var bcrypt                = require('bcrypt-nodejs');
var passportLocalMongoose = require("passport-local-mongoose");

// define the schema for our user model
var userSchema = new mongoose.Schema({

    local            : {
        username     : String,
        email        : String, // remove this?
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.plugin(passportLocalMongoose);

// create the model for users and expose it to our app
<<<<<<< HEAD
>>>>>>> parent of bf74a83... Added some social places, waiting to solve login error etc.
=======
>>>>>>> parent of bf74a83... Added some social places, waiting to solve login error etc.
module.exports = mongoose.model("User", userSchema);