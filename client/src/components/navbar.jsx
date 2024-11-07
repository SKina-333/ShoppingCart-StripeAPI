import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../contexts/cartContext.jsx";

import "./css/navbar.css";
import CartContainer from "../pages/Cart Page/cartContainer.jsx";

function Nav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const { cartCount, cartItems } = useContext(CartContext);

  const [isCartVisible, setCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setCartVisible(!isCartVisible);
  };

  return (
    <>
      <nav className="navbar-container">
        <div className="navItem-group">
          <Link
            to="/"
            className={`navItem ${isActive("/") ? "active" : ""}`}
            onClick={(e) => isActive("/") && e.preventDefault()}
          >
            Home
          </Link>
          <Link
            to="/product/show-all"
            className={`navItem ${isActive("/product") ? "active" : ""}`}
            onClick={(e) => isActive("/product") && e.preventDefault()}
          >
            Product
          </Link>
        </div>
        <div className="navCart-container" onClick={toggleCartVisibility}>
          <i className="fa-solid fa-cart-shopping"></i>
          {cartCount > 0 && <div className="cart-indicator">{cartCount}</div>}
        </div>
      </nav>
      {isCartVisible && (
        <CartContainer cartItems={cartItems} />
      )}
    </>
  );
}

export default Nav;
