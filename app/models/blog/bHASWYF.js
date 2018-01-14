var mongoose = require("mongoose");

var bHASWYFSchema = mongoose.Schema({
    blogComment: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: String
    }
});

module.exports = mongoose.model("BHASWYF", bHASWYFSchema);