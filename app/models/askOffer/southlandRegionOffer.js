var mongoose = require("mongoose");
var southlandRegionOfferSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("SouthlandRegionOffer", southlandRegionOfferSchema);