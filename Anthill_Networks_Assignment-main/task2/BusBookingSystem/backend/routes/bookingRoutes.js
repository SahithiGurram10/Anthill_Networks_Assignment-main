const express = require("express");
const { bookBus, cancelBooking } = require("../controllers/bookingController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", authMiddleware("user"), bookBus);
router.put("/:id/cancel", authMiddleware("user"), cancelBooking);
module.exports = router;