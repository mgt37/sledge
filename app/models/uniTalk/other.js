var mongoose = require("mongoose");
var otherSchema = new mongoose.Schema({
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
            ref: "OtherComment"
        }
    ]
});

module.exports = mongoose.model("Other", otherSchema);