import React, { useContext } from "react";
import CartItemCard from "../../components/cartItemCard";
import "./cartContainer.css";

import { CartContext } from "../../contexts/cartContext";

import axios from "axios";

function CartContainer({ cartItems }) {

  const {clearCart} = useContext(CartContext);
  

  const handleCheckout = async () => {
    try {
      // Call the backend to initiate the checkout session
      const response = await axios.post("http://localhost:5000/cart/buy", {}, { withCredentials: true });
      if (response.status === 200 && response.data.checkoutUrl) {
        // Redirect the user to the checkout URL provided by Stripe
        
        window.location.href = response.data.checkoutUrl;
      } else {
        console.error("Failed to initiate checkout:", response.data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
    }
  };

  return (
    <div className="cartDisplay-Container">
      <div className="cartDisplayItem-container">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <CartItemCard key={item.id} cartItem={item} />
          ))
        )}
        <button onClick={clearCart}>Clear Cart</button>
      </div>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default CartContainer;
