var mongoose = require("mongoose");
var northlandRegionAskSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("NorthlandRegionAsk", northlandRegionAskSchema);