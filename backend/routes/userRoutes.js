const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, isAdmin } = require("../middleware/authMiddleware");


router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const { role } = req.query;
    const users = role ? await User.find({ role }) : await User.find();
    res.json(users);
  } catch (err) {
    console.error(" User fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;
