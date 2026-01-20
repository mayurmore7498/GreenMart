
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getAllProducts);


router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
