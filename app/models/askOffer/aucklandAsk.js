var mongoose = require("mongoose");
var aucklandAskSchema = new mongoose.Schema({
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
            ref: "AucklandAskComment"
        }
    ]
});

module.exports = mongoose.model("AucklandAsk", aucklandAskSchema);