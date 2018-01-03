var mongoose = require("mongoose");
var aucklandOfferSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AucklandOfferComment"
        }
    ]
});

module.exports = mongoose.model("AucklandOffer", aucklandOfferSchema);