var mongoose = require("mongoose");

var friendStaysOverAtFlatCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("FriendStaysOverAtFlatComment", friendStaysOverAtFlatCommentSchema);