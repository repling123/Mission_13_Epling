import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";

function CartPage() {
  const navigate = useNavigate();
  const { cart, totalPrice, removeCartItem, emptyCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="d-flex flex-column align-items-center my-5">
            {cart.map((item: CartItem) => (
              <div key={item.bookId} className="card w-50">
                <div className="card-header">
                  {item.title} ${item.price.toFixed(2)} &ndash; x{item.quantity}
                </div>
                <div className="card-body d-flex justify-content-center align-items-center flex-wrap gap-3">
                  <p className="m-0">Subtotal: ${item.subtotal.toFixed(2)}</p>
                  <button onClick={() => removeCartItem(item.bookId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
      <button>Checkout</button>
      <button onClick={() => navigate("/")}>Continue Shopping</button>
      {cart.length > 0 && <button onClick={emptyCart}>Clear Cart</button>}
    </div>
  );
}

export default CartPage;
