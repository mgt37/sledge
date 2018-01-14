var mongoose = require("mongoose");
var northlandRegionOfferSchema = new mongoose.Schema({
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

module.exports = mongoose.model("NorthlandRegionOffer", northlandRegionOfferSchema);