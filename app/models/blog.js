var mongoose = require("mongoose");
var topicSchema = new mongoose.Schema({
    title: String,
    post: String,
    tag: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Topic", topicSchema);