var mongoose = require("mongoose");

var partyIdeasCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("PartyIdeasComment", partyIdeasCommentSchema);