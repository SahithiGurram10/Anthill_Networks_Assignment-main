const express = require("express");
const { addBus, updateBus, getBuses } = require("../controllers/busController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", authMiddleware("admin"), addBus);
router.put("/:id", authMiddleware("admin"), updateBus);
router.get("/", getBuses);
module.exports = router;