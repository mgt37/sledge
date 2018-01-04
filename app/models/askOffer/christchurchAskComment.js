var mongoose = require("mongoose");

var christchurchAskCommentSchema = mongoose.Schema({
    text:   String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("ChristchurchAskComment", christchurchAskCommentSchema);