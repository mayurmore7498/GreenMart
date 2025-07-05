import { useState } from "react";
import API from "../services/api"; // Axios instance
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();  // ✅ Only declare once
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
  const res = await API.post("/auth/login", form);
  login(res.data);
  window.location.reload(); // optional
} catch (err) {
  console.error("Login failed:", err?.response?.data);
  alert(err?.response?.data?.message || "Login failed");
}
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="form-control my-2"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          className="form-control my-2"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}
