var mongoose = require("mongoose");

var waikatoRegionOfferCommentSchema = mongoose.Schema({
    text:   String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("WaikatoRegionOfferComment", waikatoRegionOfferCommentSchema);