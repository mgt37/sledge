var mongoose = require("mongoose");
var manawatuWhanganuiRegionOfferSchema = new mongoose.Schema({
    title: String,
    body: String,
    hourlyRate: String,
    contactEmail: String,
    otherContact: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("ManawatuWhanganuiRegionOffer", manawatuWhanganuiRegionOfferSchema);