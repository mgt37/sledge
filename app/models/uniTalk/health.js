var mongoose = require("mongoose");
var healthSchema = new mongoose.Schema({
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
            ref: "HealthComment"
        }
    ]
});

module.exports = mongoose.model("Health", healthSchema);