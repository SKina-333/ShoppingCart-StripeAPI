import React, { useContext } from "react";
import { CartContext } from "../contexts/cartContext.jsx";
import "./css/productCard.css";
import axios from "axios";

function ProductCard({ product }) {

  const { updateCartCount } = useContext(CartContext);

  const addToCart = async () => {
    try {
      const response = await axios.post("http://localhost:5000/cart/", {
        name: product.name,
        quantity: 1, // default quantity of 1
        price: product.price
      }, { withCredentials: true });

      if (response.status === 200) {
        console.log("Product added to cart:", response.data);
        updateCartCount(response.data.cart);
      } else {
        console.error("Failed to add product to cart:", response.data);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };


  return (
    <div className="product-card">
      <div className="image-container">
        {product.file_path ? (
          <img
            src={`http://localhost:5000/${product.file_path}`}
            alt={product.name}
          />
        ) : (
          <img src="../../public/grey.jpg" alt="unavailable" />
        )}
      </div>

      <p className="product-name">{product.name}</p>
      <h2>${product.price}</h2>
      <button className="addButton" onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
