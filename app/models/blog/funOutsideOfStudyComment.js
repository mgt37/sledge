var mongoose = require("mongoose");

var funOutsideOfStudyCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("FunOutsideOfStudyComment", funOutsideOfStudyCommentSchema);