import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
  cart: CartItem[];
  totalPrice: number;
  cartAnimation: boolean;
  addCartItem: (item: CartItem) => void;
  removeCartItem: (bookId: number) => void;
  emptyCart: () => void;
  animateCartLink: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartAnimation, setCartAnimation] = useState<boolean>(false);

  const addCartItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookId === item.bookId);
      const updatedCart = prevCart.map((c) =>
        c.bookId === item.bookId
          ? {
              ...c,
              subtotal: c.subtotal + item.price,
              quantity: c.quantity + 1,
            }
          : c
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeCartItem = (bookId: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((c) =>
            c.bookId === bookId
              ? {
                  ...c,
                  quantity: c.quantity - 1,
                  subtotal: c.subtotal - c.price,
                }
              : c
          )
          .filter((c) => c.quantity > 0) // Remove items with quantity 0
    );
  };

  const emptyCart = () => {
    setCart(() => []);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.subtotal, 0);

  const animateCartLink = () => {
    setCartAnimation(false);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 1000);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        cartAnimation,
        addCartItem,
        removeCartItem,
        emptyCart,
        animateCartLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart requires a CartProvider.");
  }
  return context;
};
