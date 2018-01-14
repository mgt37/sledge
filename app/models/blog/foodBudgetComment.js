var mongoose = require("mongoose");

var foodBudgetCommentSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("FoodBudgetComment", foodBudgetCommentSchema);