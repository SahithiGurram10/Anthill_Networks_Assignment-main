require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
require("dotenv").config();


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://insamam:insamamins$$$786@busbooking.08kla.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.use("/auth", authRoutes);
app.use("/buses", busRoutes);
app.use("/bookings", bookingRoutes);


const listEndpoints = require("express-list-endpoints");
console.log(listEndpoints(app));


app.listen(5000, () => console.log("Server running on port 5000"));