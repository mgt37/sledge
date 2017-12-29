var mongoose = require("mongoose");
var alcoholSchema = new mongoose.Schema({
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
            ref: "AlcoholComment"
        }
    ]
});

module.exports = mongoose.model("Alcohol", alcoholSchema);