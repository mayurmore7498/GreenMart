// backend/models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      name: String,
      qty: Number,
      image: String,
      price: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
  paymentMethod: String,
  totalPrice: Number,

  // ✅ Delivery fields
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // delivery boy
    default: null,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: Date,
}, {
  timestamps: true,
});

module.exports = mongoose.model("Order", orderSchema);
