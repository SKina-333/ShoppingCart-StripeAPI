
import { Outlet } from "react-router-dom";

import "./productsPage.css";


import Nav from "../../components/navbar";

function ProductPage() {


  
  return (
    <>
      <Nav />
      <div className="shoppingPage-container">
        <Outlet />
      </div>
    </>
  );
}

export default ProductPage;
