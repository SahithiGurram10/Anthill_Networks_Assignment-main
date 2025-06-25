const Booking = require("../models/Booking");
exports.bookBus = async (req, res) => {
    const { busId } = req.body;
    const booking = new Booking({ userId: req.user.id, busId });
    await booking.save();
    res.json(booking);
};

exports.cancelBooking = async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { new: true });
    res.json(booking);
};