var mongoose = require("mongoose");

var lookingForAFlatCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("LookingForAFlatCommentComment", lookingForAFlatCommentSchema);