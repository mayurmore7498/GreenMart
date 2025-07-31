import { useEffect, useState } from "react";
import API from "../../services/api";

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchAssignedOrders = async () => {
    const res = await API.get("/orders/delivery/assigned");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  const markDelivered = async (id) => {
    await API.put(`/orders/${id}/deliver`);
    fetchAssignedOrders(); // refresh after marking
  };

  return (
    <div className="container mt-4">
      <h3>Assigned Orders</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Address</th>
            <th>Status</th>
            <th>Deliver</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id.slice(0, 8)}</td>
              <td>{o.user?.name}</td>
              <td>₹{o.totalPrice}</td>
              <td>{o.shippingAddress?.address}</td>
              <td>{o.isDelivered ? "Delivered" : "Pending"}</td>
              <td>
                {!o.isDelivered && (
                  <button onClick={() => markDelivered(o._id)} className="btn btn-success btn-sm">
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
