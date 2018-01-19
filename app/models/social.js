// load the things we need
var mongoose              = require('mongoose');
var bcrypt                = require('bcrypt-nodejs');
var passportLocalMongoose = require("passport-local-mongoose");

// define the schema for our user model
var socialSchema = new mongoose.Schema({
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
socialSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
socialSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

socialSchema.plugin(passportLocalMongoose);

// create the model for users and expose it to our app
module.exports = mongoose.model("Social", socialSchema);