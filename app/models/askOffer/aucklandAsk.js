var mongoose = require("mongoose");
var aucklandAskSchema = new mongoose.Schema({
    title: String,
    body: String,
    hourlyRate: String,
    contactEmail: String,
    otherContact: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AucklandAskComment"
        }
    ]
});

module.exports = mongoose.model("AucklandAsk", aucklandAskSchema);