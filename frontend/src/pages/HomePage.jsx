import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

 return (
  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
  {products.map((product) => (
    <div key={product._id} className="col">
      <ProductCard product={product} addToCart={addToCart} />
    </div>
  ))}
</div>

);
}
