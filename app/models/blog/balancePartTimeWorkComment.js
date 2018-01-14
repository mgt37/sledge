var mongoose = require("mongoose");

var balancePartTimeWorkCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("BalancePartTimeWorkComment", balancePartTimeWorkCommentSchema);