const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product"); // ✅ Ensure Product is imported
const sendOrderConfirmationEmail = require("../utils/emailService");

// ✅ Place Order with email and stock check
exports.placeOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // 🔁 Check stock and update before placing order
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.name}` });
      }

      if (product.countInStock < item.qty) {
        return res.status(400).json({ message: `${product.name} is out of stock.` });
      }

      product.countInStock -= item.qty;
      await product.save();
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
    if (user) {
      await sendOrderConfirmationEmail(user.email, user.name, createdOrder);
    }

    res.status(201).json(createdOrder);
  } catch (err) {
    console.error("❌ Order placement error:", err.message);
    res.status(500).json({ message: "Server error during order placement" });
  }
};

// ✅ Get user’s own orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error("❌ Get my orders error:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error("❌ Get all orders error:", error.message);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

// ✅ Mark order as delivered (admin only)
exports.markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error("❌ Mark delivered error:", error.message);
    res.status(500).json({ message: "Update failed" });
  }
};
