const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Protect route - verify JWT
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// ✅ Admin middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Admins only" });
};

// ✅ Delivery boy middleware
const isDeliveryBoy = (req, res, next) => {
  if (req.user && req.user.role === "delivery") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Delivery personnel only" });
};

// ✅ Admin OR Delivery boy middleware
const isAdminOrDeliveryBoy = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "delivery")) {
    return next();
  }
  return res.status(403).json({ 
    message: "Access denied: Requires admin or delivery privileges" 
  });
};

// ✅ Export all middleware
module.exports = { 
  protect, 
  isAdmin, 
  isDeliveryBoy, 
  isAdminOrDeliveryBoy 
};