var mongoose = require("mongoose");

var findingPartTimeWorkCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("FindingPartTimeWorkComment", findingPartTimeWorkCommentSchema);