var mongoose = require("mongoose");
var liquorSchema = new mongoose.Schema({
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
            ref: "liquorComment"
        }
    ]
});

module.exports = mongoose.model("Liquor", liquorSchema);