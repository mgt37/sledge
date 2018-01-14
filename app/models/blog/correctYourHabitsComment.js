var mongoose = require("mongoose");

var correctYourHabitsCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("CorrectYourHabitsComment", correctYourHabitsCommentSchema);