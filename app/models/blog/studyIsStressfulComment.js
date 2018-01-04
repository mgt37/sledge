var mongoose = require("mongoose");

var studyIsStressfulCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("StudyIsStressfulComment", studyIsStressfulCommentSchema);