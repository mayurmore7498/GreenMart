import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    category: "",
    price: "",
    countInStock: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`);
      setForm(res.data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/products/${id}`, form);
      alert("Product updated");
      navigate("/admin/products");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" className="form-control my-2" value={form.name} onChange={handleChange} />
        <input name="image" className="form-control my-2" value={form.image} onChange={handleChange} />
        <input name="description" className="form-control my-2" value={form.description} onChange={handleChange} />
        <input name="category" className="form-control my-2" value={form.category} onChange={handleChange} />
        <input name="price" type="number" className="form-control my-2" value={form.price} onChange={handleChange} />
        <input name="countInStock" type="number" className="form-control my-2" value={form.countInStock} onChange={handleChange} />
        <button className="btn btn-success w-100">Update Product</button>
      </form>
    </div>
  );
}
