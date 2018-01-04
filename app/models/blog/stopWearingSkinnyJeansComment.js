var mongoose = require("mongoose");

var stopWearingSkinnyJeansCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("StopWearingSkinnyJeansComment", stopWearingSkinnyJeansCommentSchema);