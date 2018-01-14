var mongoose = require("mongoose");

var sleepEffectivelyCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("SleepEffectivelyComment", sleepEffectivelyCommentSchema);