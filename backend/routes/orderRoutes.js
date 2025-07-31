const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect, isAdmin, isDeliveryBoy, isAdminOrDeliveryBoy } = require("../middleware/authMiddleware");

// User routes
router.post("/", protect, orderController.placeOrder);
router.get("/my", protect, orderController.getMyOrders);

// Admin routes
router.get("/", protect, isAdmin, orderController.getAllOrders);
router.put("/:id/assign", protect, isAdmin, orderController.assignOrder);

// Delivery routes
router.get("/delivery/assigned", protect, isDeliveryBoy, orderController.getAssignedOrders);

// Shared delivery status update
router.put("/:id/deliver", protect, isAdminOrDeliveryBoy, orderController.markAsDelivered);

module.exports = router;