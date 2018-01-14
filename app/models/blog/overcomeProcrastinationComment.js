var mongoose = require("mongoose");

var overcomeProcrastinationCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("OvercomeProcrastinationComment", overcomeProcrastinationCommentSchema);