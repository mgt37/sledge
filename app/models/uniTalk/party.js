var mongoose = require("mongoose");
var partySchema = new mongoose.Schema({
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
            ref: "PartyComment"
        }
    ]
});

module.exports = mongoose.model("Party", partySchema);