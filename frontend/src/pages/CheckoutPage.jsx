 import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const totalPrice = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const orderData = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      })),
      shippingAddress: shipping,
      paymentMethod,
      totalPrice,
    };

    try {
      await API.post("/orders", orderData);
      clearCart();
      alert("Order placed successfully!");
      navigate("/my-orders");
    } catch (err) {
      alert("Order placement failed");
    }
  };

  if (!user) return <h4>Please log in to place an order.</h4>;

  return (
    <div className="row">
      <div className="col-md-7">
        <h3>Shipping Information</h3>
        <form onSubmit={handlePlaceOrder}>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Address"
            value={shipping.address}
            onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
            required
          />
          <input
            type="text"
            className="form-control my-2"
            placeholder="City"
            value={shipping.city}
            onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
          />
          <input
            type="text"
            className="form-control my-2"
            placeholder="Postal Code"
            value={shipping.postalCode}
            onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
          />
          <input
            type="text"
            className="form-control my-2"
            placeholder="Country"
            value={shipping.country}
            onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
          />

          <h5 className="mt-4">Payment Method</h5>
          <select
            className="form-control mb-3"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Card</option>
          </select>

          <button className="btn btn-success w-100">Place Order</button>
        </form>
      </div>

      <div className="col-md-5">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item._id} className="d-flex justify-content-between mb-2">
            <div>{item.name} × {item.qty}</div>
            <div>₹{item.qty * item.price}</div>
          </div>
        ))}
        <hr />
        <h4>Total: ₹{totalPrice}</h4>
      </div>
    </div>
  );
}
