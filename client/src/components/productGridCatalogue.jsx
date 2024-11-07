// ProductDisplay.jsx
import React from "react";
import ProductCard from "./productCard.jsx";
import './css/productGridCatalogue.css'

function ProductDisplay({ products }) {
  return (
    <div className="productDisplay-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductDisplay;