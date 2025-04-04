import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";

function HandleCart({
  bookId,
  title,
  price,
}: {
  bookId: number;
  title: string;
  price: number;
}) {
  const { addCartItem, animateCartLink } = useCart();

  const handleAddToCart = ({
    bookId,
    title,
    price,
  }: {
    bookId: number;
    title: string;
    price: number;
  }) => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || "No Book Found",
      price,
      quantity: 1,
      subtotal: price,
    };
    addCartItem(newItem);
    animateCartLink();
  };

  return (
    <button
      style={{ backgroundColor: "#007bff", color: "white" }}
      className="cart-scale"
      onClick={() => handleAddToCart({ bookId, title, price })}
    >
      Add to Cart
    </button>
  );
}

export default HandleCart;
