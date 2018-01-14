var mongoose = require("mongoose");

var moneyPlanCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("MoneyPlanComment", moneyPlanCommentSchema);