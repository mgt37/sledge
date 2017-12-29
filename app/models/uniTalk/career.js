var mongoose = require("mongoose");
var careerSchema = new mongoose.Schema({
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
            ref: "CareerComment"
        }
    ]
});

module.exports = mongoose.model("Career", careerSchema);