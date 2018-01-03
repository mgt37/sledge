var mongoose = require("mongoose");

var aucklandAskCommentSchema = mongoose.Schema({
    text:   String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("AucklandAskComment", aucklandAskCommentSchema);