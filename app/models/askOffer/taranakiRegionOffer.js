var mongoose = require("mongoose");
var taranakiRegionOfferSchema = new mongoose.Schema({
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

module.exports = mongoose.model("TaranakiRegionOffer", taranakiRegionOfferSchema);