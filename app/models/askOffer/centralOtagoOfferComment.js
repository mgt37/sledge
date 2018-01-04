var mongoose = require("mongoose");

var centralOtagoOfferCommentSchema = mongoose.Schema({
    text:   String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("CentralOtagoOfferComment", centralOtagoOfferCommentSchema);