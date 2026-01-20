// backend/scripts/addProduct.js
const mongoose = require("mongoose");
const Product = require("../models/Product");

mongoose.connect("mongodb://localhost:27017/greenmart").then(async () => {
  await Product.create({
    name: "Quick Test Apple",
    price: 80,
    category: "Fruits",
    description: "Imported red apple",
    image: "https://example.com/apple.jpg",
    stock: 100,
  });
  console.log(" Product inserted");
  process.exit();
});
