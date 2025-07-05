import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await API.get("/orders/my");
        setOrders(res.data);
      } catch (err) {
        console.error("Error loading orders", err);
      }
    };
    loadOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Delivery</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(0, 8)}</td>
                <td>{order.orderItems.map(i => i.name).join(", ")}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.isPaid ? "Paid" : "Unpaid"}</td>
                <td>{order.isDelivered ? "Delivered" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
