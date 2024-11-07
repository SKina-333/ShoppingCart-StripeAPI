import { useState } from "react";

import "./App.css";

import Nav from "./components/navbar.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav />
      <section className="mainPage-container">
        <div className="section-container">
          <h1 className="section-title main">Shopping Website</h1>
          <p className="section-description main">
            We aim to change your perspective with our collection of colours.
          </p>
          <button className="shopButton main">Browse Items</button>
        </div>
      </section>
    </>
  );
}

export default App;
