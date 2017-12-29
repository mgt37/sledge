var mongoose = require("mongoose");
var sexSchema = new mongoose.Schema({
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
            ref: "SexComment"
        }
    ]
});

module.exports = mongoose.model("Sex", sexSchema);