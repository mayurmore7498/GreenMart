import { useState } from "react";
import API from "../../services/api";

export default function RegisterDeliveryBoy() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/users/delivery", form); // ✅ Correct URL
    setMessage("✅ Delivery boy registered successfully");
  } catch (err) {
    console.error("❌ Register error:", err.response?.data || err.message);
    setMessage("❌ " + (err.response?.data?.message || "Server error"));
  }
};


  return (
    <div>
      <h3>Register Delivery Boy</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="form-control my-2" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control my-2" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control my-2" required />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
