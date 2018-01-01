var mongoose = require("mongoose");
var bayOfPlentyRegionOfferSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("BayOfPlentyRegionOffer", bayOfPlentyRegionOfferSchema);