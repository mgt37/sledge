var mongoose = require("mongoose");

var buildYourNetworkCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("BuildYourNetworkComment", buildYourNetworkCommentSchema);