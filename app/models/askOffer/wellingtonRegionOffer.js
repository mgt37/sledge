var mongoose = require("mongoose");
var wellingtonRegionOfferSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("WellingtonRegionOffer", wellingtonRegionOfferSchema);