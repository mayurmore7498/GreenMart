import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AddProductPage from "./pages/admin/AddProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import RegisterDeliveryBoy from "./pages/admin/RegisterDeliveryBoy";

import DeliveryDashboard from "./pages/Delivery/DeliveryDashboard";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  const PrivateRoute = ({ children }) =>
    user ? children : <Navigate to="/login" />;

  const AdminRoute = ({ children }) =>
    user?.role === "admin" ? children : <Navigate to="/" />;

  const DeliveryRoute = ({ children }) =>
    user?.role === "delivery" ? children : <Navigate to="/login" />;

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          {/* User Routes */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
          <Route path="/my-orders" element={<PrivateRoute><MyOrdersPage /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProductsPage /></AdminRoute>} />
          <Route path="/admin/products/add" element={<AdminRoute><AddProductPage /></AdminRoute>} />
          <Route path="/admin/products/edit/:id" element={<AdminRoute><EditProductPage /></AdminRoute>} />
          <Route path="/admin/register-delivery" element={<AdminRoute><RegisterDeliveryBoy /></AdminRoute>} />

          {/* Delivery Boy Route */}
         <Route
  path="/delivery/dashboard"
  element={<DeliveryRoute><DeliveryDashboard /></DeliveryRoute>}
/>

        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
