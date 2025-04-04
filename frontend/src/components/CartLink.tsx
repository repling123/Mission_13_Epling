import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

const CartLink = () => {
  const navigate = useNavigate();
  const { totalPrice, cartAnimation } = useCart();

  return (
    <div
      className={cartAnimation ? "cart-glow" : ""}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1.5rem",
        padding: "1rem 1.5rem",
        borderRadius: "5px",
        backgroundColor: "#D4EDDA",
        cursor: "pointer",
        border: "1px solid #ccc",
        zIndex: "100",
        display: "flex",
        gap: "1rem",
      }}
      onClick={() => navigate("/cart")}
    >
      <p className="m-0">View Cart</p>
      <div className={cartAnimation ? "cart-scale" : ""}>
        <i className="bi bi-cart"></i> ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default CartLink;
