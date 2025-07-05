import { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user?.role !== "admin") return;

    const fetchData = async () => {
      try {
        const ordersRes = await API.get("/orders");
        const productsRes = await API.get("/products");
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Admin fetch error", err);
      }
    };

    fetchData();
  }, [user]);

  const markDelivered = async (id) => {
    try {
      await API.put(`/orders/${id}/deliver`);
      setOrders(orders.map(order =>
        order._id === id ? { ...order, isDelivered: true, deliveredAt: new Date() } : order
      ));
    } catch (err) {
      alert("Failed to mark as delivered");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h4 className="mt-4">All Orders</h4>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Delivery</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id.slice(0, 8)}</td>
              <td>{o.user?.name}</td>
              <td>₹{o.totalPrice}</td>
              <td>{o.isPaid ? "Paid" : "COD"}</td>
              <td>{o.isDelivered ? "Delivered" : "Pending"}</td>
              <td>
                {!o.isDelivered && (
                  <button onClick={() => markDelivered(o._id)} className="btn btn-sm btn-success">
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">All Products</h4>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.countInStock}</td>
              <td>{p.category}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
