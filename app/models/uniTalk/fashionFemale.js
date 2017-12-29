var mongoose = require("mongoose");
var fashionFemaleSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FashionFemaleComment"
        }
    ]
});

module.exports = mongoose.model("FashionFemale", fashionFemaleSchema);