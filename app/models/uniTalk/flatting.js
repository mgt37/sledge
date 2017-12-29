var mongoose = require("mongoose");
var flattingSchema = new mongoose.Schema({
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
            ref: "FlattingComment"
        }
    ]
});

module.exports = mongoose.model("Flatting", flattingSchema);