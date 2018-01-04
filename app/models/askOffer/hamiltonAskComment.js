var mongoose = require("mongoose");

var hamiltonAskCommentSchema = mongoose.Schema({
    text:   String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("HamiltonAskComment", hamiltonAskCommentSchema);