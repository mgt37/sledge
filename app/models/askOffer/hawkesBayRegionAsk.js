var mongoose = require("mongoose");
var hawkesBayRegionAskSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("HawkesBayRegionAsk", hawkesBayRegionAskSchema);