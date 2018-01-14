var mongoose = require("mongoose");
var sportSchema = new mongoose.Schema({
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
            ref: "SportComment"
        }
    ]
});

module.exports = mongoose.model("Sport", sportSchema);