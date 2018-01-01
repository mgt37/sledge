var mongoose = require("mongoose");
var nelsonMarlboroughRegionOfferSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("NelsonMarlboroughRegionOffer", nelsonMarlboroughRegionOfferSchema);