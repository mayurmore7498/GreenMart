import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, updateQty, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart. <Link to="/">Go shopping</Link></p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="d-flex align-items-center mb-3 border p-2">
              <img src={item.image} alt={item.name} style={{ width: "80px", marginRight: "15px" }} />
              <div className="flex-grow-1">
                <h5>{item.name}</h5>
                <p>₹{item.price} x 
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item._id, Number(e.target.value))}
                    className="mx-2"
                    style={{ width: "60px" }}
                  /> = ₹{item.price * item.qty}
                </p>
              </div>
              <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}

          <h4>Total: ₹{total}</h4>
          <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
}
