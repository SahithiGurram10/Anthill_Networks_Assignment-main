const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
    name: String,
    route: String,
    seatsAvailable: Number,
    price: Number
});
module.exports = mongoose.model("Bus", busSchema);