const Bus = require("../models/Bus");
exports.addBus = async (req, res) => {
    const bus = new Bus(req.body);
    await bus.save();
    res.json(bus);
};

exports.updateBus = async (req, res) => {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bus);
};

exports.getBuses = async (req, res) => {
    const buses = await Bus.find(req.query);
    res.json(buses);
};