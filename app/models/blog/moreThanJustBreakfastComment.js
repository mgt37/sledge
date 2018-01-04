var mongoose = require("mongoose");

var moreThanJustBreakfastCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("MoreThanJustBreakfastComment", moreThanJustBreakfastCommentSchema);