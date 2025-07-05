const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  markAsDelivered,
} = require("../controllers/orderController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

// ✅ User routes
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

// ✅ Admin routes
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/deliver", protect, isAdmin, markAsDelivered);

module.exports = router;
