const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/user", protect, (req, res) => {
  res.json({ message: "User Authenticated", user: req.user });
});

router.get("/admin", protect, isAdmin, (req, res) => {
  res.json({ message: "Admin Authenticated", user: req.user });
});

module.exports = router;
