var mongoose = require("mongoose");

var wellingtonAskCommentSchema = mongoose.Schema({
    text:   String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("WellingtonAskComment", wellingtonAskCommentSchema);