import "../styles/ProductCard.css"; // adjust path if needed

import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card h-100">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description.slice(0, 60)}...</p>
        <h6 className="card-price mb-3">₹{product.price}</h6>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-sm btn-add" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <Link to={`/product/${product._id}`} className="btn btn-sm btn-outline-success">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
