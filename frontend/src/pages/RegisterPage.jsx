import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" className="form-control my-2" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" className="form-control my-2" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" className="form-control my-2" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
