var mongoose = require("mongoose");

var findYourFlawsCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("FindYourFlawsComment", findYourFlawsCommentSchema);