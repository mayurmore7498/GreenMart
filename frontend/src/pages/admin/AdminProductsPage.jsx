import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      alert("Product deleted");
      loadProducts();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <Link to="/admin/products/add" className="btn btn-primary mb-3">+ Add Product</Link>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.countInStock}</td>
              <td>
                <Link to={`/admin/products/edit/${p._id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <button onClick={() => deleteProduct(p._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
