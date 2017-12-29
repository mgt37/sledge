var mongoose = require("mongoose");
var vehicleSchema = new mongoose.Schema({
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
            ref: "VehicleComment"
        }
    ]
});

module.exports = mongoose.model("Vehicle", vehicleSchema);