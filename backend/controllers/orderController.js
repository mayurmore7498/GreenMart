const Order = require("../models/Order");
const User = require("../models/User");
<<<<<<< HEAD
const Product = require("../models/Product");
const sendOrderConfirmationEmail = require("../utils/emailService");

// Place a new order
const placeOrder = async (req, res) => {
=======
const Product = require("../models/Product"); // ✅ Ensure Product is imported
const sendOrderConfirmationEmail = require("../utils/emailService");

// ✅ Place Order with email and stock check
exports.placeOrder = async (req, res) => {
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

<<<<<<< HEAD
    // Check stock and update
=======
    // 🔁 Check stock and update before placing order
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
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

    // Send order confirmation email
    const user = await User.findById(req.user._id);
<<<<<<< HEAD
    if (user && typeof sendOrderConfirmationEmail === "function") {
=======
    if (user) {
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
      await sendOrderConfirmationEmail(user.email, user.name, createdOrder);
    }

    res.status(201).json(createdOrder);
  } catch (err) {
    console.error("Order placement error:", err.message);
    res.status(500).json({ message: "Server error during order placement" });
  }
};

<<<<<<< HEAD
// Get logged-in user's orders
const getMyOrders = async (req, res) => {
=======
// ✅ Get user’s own orders
exports.getMyOrders = async (req, res) => {
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
<<<<<<< HEAD
    console.error("Get my orders error:", error.message);
=======
    console.error("❌ Get my orders error:", error.message);
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

<<<<<<< HEAD
// Admin: Get all orders
const getAllOrders = async (req, res) => {
=======
// ✅ Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
<<<<<<< HEAD
    console.error("Get all orders error:", error.message);
=======
    console.error("❌ Get all orders error:", error.message);
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

<<<<<<< HEAD
// Mark order as delivered
const markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
=======
// ✅ Mark order as delivered (admin only)
exports.markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
<<<<<<< HEAD
    console.error("Mark delivered error:", error.message);
=======
    console.error("❌ Mark delivered error:", error.message);
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
    res.status(500).json({ message: "Update failed" });
  }
};

// Admin: Assign order to delivery boy
const assignOrder = async (req, res) => {
  const { deliveryBoyId } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.assignedTo = deliveryBoyId;
    await order.save();

    res.json({ message: "Order assigned successfully", order });
  } catch (error) {
    console.error("Assign order error:", error.message);
    res.status(500).json({ message: "Failed to assign order" });
  }
};

// Delivery Boy: Get assigned orders
const getAssignedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ assignedTo: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error("Get assigned orders error:", error.message);
    res.status(500).json({ message: "Failed to fetch assigned orders" });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  markAsDelivered,
  assignOrder,
  getAssignedOrders
};