var mongoose = require("mongoose");

var moreThanJustBreakfastCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("MoreThanJustBreakfastComment", moreThanJustBreakfastCommentSchema);