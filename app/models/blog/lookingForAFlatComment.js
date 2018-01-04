var mongoose = require("mongoose");

var lookingForAFlatCommentSchema = mongoose.Schema({
    text:   String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("LookingForAFlatCommentComment", lookingForAFlatCommentSchema);