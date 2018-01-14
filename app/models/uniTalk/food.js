var mongoose = require("mongoose");
var foodSchema = new mongoose.Schema({
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
            ref: "FoodComment"
        }
    ]
});

module.exports = mongoose.model("Food", foodSchema);