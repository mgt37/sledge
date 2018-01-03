var mongoose = require("mongoose");

var hayfeverTreatmentCommentSchema = mongoose.Schema({
    body:   String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("HayfeverTreatmentComment", hayfeverTreatmentCommentSchema);