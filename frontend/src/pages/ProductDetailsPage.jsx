import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-5">
          <img src={product.image} alt={product.name} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h4>₹{product.price}</h4>
          <p>Stock: {product.countInStock}</p>
          <button className="btn btn-success">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
