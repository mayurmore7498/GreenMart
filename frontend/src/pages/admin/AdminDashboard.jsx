import { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);

  useEffect(() => {
    if (user?.role !== "admin") return;

    const fetchData = async () => {
      try {
        const ordersRes = await API.get("/orders");
        const productsRes = await API.get("/products");
        const deliveryBoysRes = await API.get("/users?role=delivery");

        setOrders(ordersRes.data);
        setProducts(productsRes.data);
        setDeliveryBoys(deliveryBoysRes.data);
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

<<<<<<< HEAD
  const assignOrder = async (orderId, deliveryBoyId) => {
    try {
      await API.put(`/orders/${orderId}/assign`, { deliveryBoyId });
      alert("Assigned successfully");
    } catch (err) {
      alert("Failed to assign delivery boy");
    }
  };

  // 📅 Monthly stats
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

=======
  // 📅 Current Month & Year
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // 💰 Monthly Order Total
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
  const monthlyOrderTotal = orders
    .filter((o) => {
      const d = new Date(o.createdAt);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, o) => sum + o.totalPrice, 0);

<<<<<<< HEAD
=======
  // 💰 Monthly Product Price Total (created this month)
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
  const monthlyProductTotal = products
    .filter((p) => {
      const d = new Date(p.createdAt);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, p) => sum + p.price, 0);

<<<<<<< HEAD
=======
  // 📊 Product Count by Category
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h2>Admin Dashboard</h2>

<<<<<<< HEAD
      {/* Monthly Stats */}
=======
      {/* 🧾 Monthly Reports */}
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
      <div className="row my-4">
        <div className="col-md-4">
          <div className="alert alert-info shadow-sm">
            📦 <strong>Total Orders This Month:</strong> ₹{monthlyOrderTotal}
          </div>
        </div>
        <div className="col-md-4">
          <div className="alert alert-success shadow-sm">
<<<<<<< HEAD
            🛍️ <strong>Total Product This Month:</strong> ₹{monthlyProductTotal}
=======
            🛍️ <strong>Total Product  This Month:</strong> {monthlyProductTotal}
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
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

<<<<<<< HEAD
      {/* Orders Table */}
=======
      {/* 📋 Orders Table */}
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
      <h4 className="mt-4">All Orders</h4>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Delivery</th>
            <th>Assign</th>
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
<<<<<<< HEAD
              <td>
                {o.isDelivered
                  ? `Delivered (${new Date(o.deliveredAt).toLocaleDateString()})`
                  : "Pending"}
              </td>
=======
              <td>{o.isDelivered ? `Delivered (${new Date(o.deliveredAt).toLocaleDateString()})` : "Pending"}</td>
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
              <td>
                {!o.isDelivered && (
                  <select
                    className="form-select form-select-sm"
                    defaultValue=""
                    onChange={(e) => assignOrder(o._id, e.target.value)}
                  >
                    <option value="" disabled>Select Delivery Boy</option>
                    {deliveryBoys.map((boy) => (
                      <option key={boy._id} value={boy._id}>{boy.name}</option>
                    ))}
                  </select>
                )}
              </td>
              <td>
                {!o.isDelivered && (
                  <button
                    onClick={() => markDelivered(o._id)}
                    className="btn btn-sm btn-success"
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

<<<<<<< HEAD
      {/* Products Table */}
=======
      {/* 📦 Products Table */}
>>>>>>> ee83da2861386e09f9650cd7c3b812a40efc8d56
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
