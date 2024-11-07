import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart", {
          withCredentials: true,
        });
        if (response.status === 200) {
          const cart = response.data.cart || [];
          setCartItems(cart);

          const itemCount = cart.reduce(
            (total, item) => total + item.quantity,
            0
          );
          setCartCount(itemCount);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const updateCartCount = (newCart) => {
    const itemCount = newCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(itemCount);
    setCartItems(newCart);
  };

  const clearCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/cart/clear", {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // Clear cart items and reset count
        setCartItems([]);
        setCartCount(0);
      } else {
        console.error("Failed to clear cart:", response.data);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartCount, cartItems, updateCartCount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
