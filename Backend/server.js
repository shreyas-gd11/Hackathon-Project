const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Allow restricting CORS to a single frontend origin in production
const FRONTEND_URL = process.env.FRONTEND_URL;
if (FRONTEND_URL) {
  app.use(cors({ origin: FRONTEND_URL }));
  console.log('CORS restricted to', FRONTEND_URL);
} else {
  app.use(cors());
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Multer configured to only parse multipart form fields (no files)
const upload = multer(); // memory storage; we'll use upload.none() on the route

// Load registration model
const Registration = require('./models/Registration');

// Connect to MongoDB if MONGO_URI is provided
const MONGO_URI = process.env.MONGO_URI || process.env.mongodb_uri;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
} else {
  console.warn('⚠️ MONGO_URI not set. Registrations will not be saved to DB.');
}

// GET /
app.get("/", (req, res) => {
  res.send("Backend connected successfully 🚀");
});

// POST /register (no file upload) — parse multipart fields without files
app.post("/register", upload.none(), async (req, res) => {
  console.log("🚀 /register route called");
  console.log("Form body:", req.body);

  try {
    // Save to DB if connected
    let saved = null;
    if (MONGO_URI) {
      const reg = new Registration({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        college: req.body.college,
        year: req.body.year,
      });
      saved = await reg.save();
    }

    res.status(200).json({
      success: true,
      message: "✅ Registration Completed Successfully!",
      data: req.body,
      saved: saved || null,
    });
  } catch (error) {
    console.error("❌ ERROR DETAILS:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Try again.",
      error: error.message,
    });
  }
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error("🌩️ Unhandled error middleware:", err);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Server error" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
