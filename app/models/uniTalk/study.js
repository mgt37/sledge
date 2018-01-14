var mongoose = require("mongoose");
var studySchema = new mongoose.Schema({
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
            ref: "StudyComment"
        }
    ]
});

module.exports = mongoose.model("Study", studySchema);