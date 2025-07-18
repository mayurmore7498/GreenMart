import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-5">Loading product...</p>;

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Product Image */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "450px", objectFit: "cover" }}
          />
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <span className="badge bg-secondary mb-2">{product.category}</span>
          <p className="text-muted">{product.description}</p>

          <h3 className="text-success fw-bold mb-3">₹{product.price}</h3>

          <p className={`${product.countInStock > 0 ? "text-success" : "text-danger"}`}>
  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
</p>

          <button
            className="btn btn-success px-4 py-2 mt-3"
            onClick={() => addToCart(product)}
            disabled={product.countInStock <= 0}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
