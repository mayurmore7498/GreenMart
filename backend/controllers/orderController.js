const Order = require("../models/Order");
const User = require("../models/User");
const sendOrderConfirmationEmail = require("../utils/emailService");

// ✅ Place Order with email
exports.placeOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();

    const user = await User.findById(req.user._id);

    // ✅ Send confirmation email
    await sendOrderConfirmationEmail(user.email, user.name, createdOrder);

    res.status(201).json(createdOrder);
  } catch (err) {
    console.error("❌ Order placement error:", err.message);
    res.status(500).json({ message: "Server error during order placement" });
  }
};

// Get user orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

// Mark order as delivered
exports.markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
