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
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, isDelivered: true, deliveredAt: new Date() } : order
        )
      );
    } catch (err) {
      alert("Failed to mark as delivered");
    }
  };

  // 📅 Current Month & Year
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // 💰 Monthly Order Total
  const monthlyOrderTotal = orders
    .filter((o) => {
      const d = new Date(o.createdAt);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, o) => sum + o.totalPrice, 0);

  // 💰 Monthly Product Price Total (created this month)
  const monthlyProductTotal = products
    .filter((p) => {
      const d = new Date(p.createdAt);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, p) => sum + p.price, 0);

  // 📊 Product Count by Category
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* 🧾 Monthly Reports */}
      <div className="row my-4">
        <div className="col-md-4">
          <div className="alert alert-info shadow-sm">
            📦 <strong>Total Orders This Month:</strong> ₹{monthlyOrderTotal}
          </div>
        </div>
        <div className="col-md-4">
          <div className="alert alert-success shadow-sm">
            🛍️ <strong>Total Product  This Month:</strong> {monthlyProductTotal}
          </div>
        </div>
        <div className="col-md-4">
          <div className="alert alert-warning shadow-sm">
            📊 <strong>Category Counts:</strong>
            <ul className="mb-0 mt-1 ps-3">
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <li key={cat}>{cat}: {count}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 📋 Orders Table */}
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
              <td>{o.isDelivered ? `Delivered (${new Date(o.deliveredAt).toLocaleDateString()})` : "Pending"}</td>
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

      {/* 📦 Products Table */}
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
