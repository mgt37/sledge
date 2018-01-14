var mongoose = require("mongoose");
var partTimeWorkSchema = new mongoose.Schema({
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
            ref: "PartTimeWorkComment"
        }
    ]
});

module.exports = mongoose.model("PartTimeWork", partTimeWorkSchema);