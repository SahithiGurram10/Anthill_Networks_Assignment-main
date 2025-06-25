const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    busId: mongoose.Schema.Types.ObjectId,
    status: { type: String, enum: ["booked", "cancelled"], default: "booked" }
});
module.exports = mongoose.model("Booking", bookingSchema);