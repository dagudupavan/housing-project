const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("<h1>Backend working ✅</h1>");
});

// ==========================
// 🔥 CONNECT MONGODB
// ==========================
mongoose.connect("mongodb://127.0.0.1:27017/housingDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// ==========================
// BOOKING SYSTEM
// ==========================

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  property: String,
  amount: String,
  date: String
});

const Booking = mongoose.model("Booking", bookingSchema);

// SAVE BOOKING
app.post("/book", async (req, res) => {
  try {
    console.log("Incoming:", req.body);

    const newBooking = new Booking(req.body);
    await newBooking.save();

    res.json({ msg: "Booking saved ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// GET BOOKINGS
app.get("/bookings", async (req, res) => {
  try {
    const data = await Booking.find();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error fetching bookings");
  }
});

// ==========================
// SERVER
// ==========================
app.listen(5001, () => {
  console.log("Server running on http://localhost:5001 🚀");
});