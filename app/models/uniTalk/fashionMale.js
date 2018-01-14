var mongoose = require("mongoose");
var fashionMaleSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FashionMaleComment"
        }
    ]
});

module.exports = mongoose.model("FashionMale", fashionMaleSchema);