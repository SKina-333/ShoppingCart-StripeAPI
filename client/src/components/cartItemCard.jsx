import React from "react";

import "./css/cartItemCard.css";


function CartItemCard({ cartItem }) {

  return (
    <div className="itemCart-card">

      <p className="product-name">{cartItem.price_data.product_data.name}</p>
      <div className="groupItem">
        <p>{cartItem.quantity}</p>
        <p>x</p>
        <p>${cartItem.price_data.unit_amount/100}</p>
      </div>
      <p className="total-price">${cartItem.quantity * (cartItem.price_data.unit_amount/100)}</p>
      
    </div>
  );
}

export default CartItemCard;
