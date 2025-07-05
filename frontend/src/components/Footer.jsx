import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-success text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Contact Info */}
          <div className="col-md-4">
            <h5>GreenMart</h5>
            <p>123 Farm Road, Village Area, Pune, India</p>
            <p>Email: support@greenmart.com</p>
            <p>Phone: +91 9876543210</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link className="text-white" to="/">Home</Link></li>
              <li><Link className="text-white" to="/cart">Cart</Link></li>
              <li><Link className="text-white" to="/my-orders">My Orders</Link></li>
              <li><Link className="text-white" to="/login">Login</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <p>
              <a href="#" className="text-white me-2">Facebook</a> |
              <a href="#" className="text-white mx-2">Instagram</a> |
              <a href="#" className="text-white">Twitter</a>
            </p>
          </div>
        </div>

        <hr className="bg-light" />
        <p className="text-center mb-0">© {year} GreenMart. All rights reserved.</p>
      </div>
    </footer>
  );
}
