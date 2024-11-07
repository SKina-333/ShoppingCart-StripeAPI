import { useState } from "react";

import "./App.css";

import Nav from "./components/navbar.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  
  const navigate = useNavigate();

  const navigateProduct = () => {
    navigate("/product");
    
  };

  return (
    <>
      <Nav />
      <section className="mainPage-container">
        <div className="section-container">
          <h1 className="section-title main">Shopping Website</h1>
          <p className="section-description main">
            We aim to change your perspective with our collection of colours.
          </p>
          <button className="shopButton main" onClick={navigateProduct}>Browse Items</button>
        </div>
      </section>
    </>
  );
}

export default App;
