var mongoose = require("mongoose");
var moneySchema = new mongoose.Schema({
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
            ref: "MoneyComment"
        }
    ]
});

module.exports = mongoose.model("Money", moneySchema);