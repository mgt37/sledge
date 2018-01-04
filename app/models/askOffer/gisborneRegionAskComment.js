var mongoose = require("mongoose");

var gisborneRegionAskCommentSchema = mongoose.Schema({
    text:   String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("GisborneRegionAskComment", gisborneRegionAskCommentSchema);