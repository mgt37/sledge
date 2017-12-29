var mongoose = require("mongoose");
var relationshipSchema = new mongoose.Schema({
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
            ref: "RelationshipComment"
        }
    ]
});

module.exports = mongoose.model("Relationship", relationshipSchema);