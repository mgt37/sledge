var mongoose = require("mongoose");

var gisborneRegionOfferCommentSchema = mongoose.Schema({
    text:   String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("GisborneRegionOfferComment", gisborneRegionOfferCommentSchema);