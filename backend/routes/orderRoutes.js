const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  markAsDelivered,
} = require("../controllers/orderController");

const { protect, isAdmin } = require("../middleware/authMiddleware");


router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/deliver", protect, isAdmin, markAsDelivered);

module.exports = router;
