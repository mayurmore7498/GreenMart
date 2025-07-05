 import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    category: "",
    price: "",
    countInStock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products", form);
      alert("Product added");
      navigate("/admin/products");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" className="form-control my-2" placeholder="Name" onChange={handleChange} required />
        <input name="image" className="form-control my-2" placeholder="Image URL" onChange={handleChange} required />
        <input name="description" className="form-control my-2" placeholder="Description" onChange={handleChange} />
        <input name="category" className="form-control my-2" placeholder="Category" onChange={handleChange} required />
        <input name="price" type="number" className="form-control my-2" placeholder="Price" onChange={handleChange} required />
        <input name="countInStock" type="number" className="form-control my-2" placeholder="Stock" onChange={handleChange} required />
        <button className="btn btn-success w-100">Add Product</button>
      </form>
    </div>
  );
}
