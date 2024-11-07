// import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./allProductsPage.css";

import ProductDisplay from "../../../components/productGridCatalogue.jsx";

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProductAdded, setNewProductAdded] = useState(false);

  const navigate = useNavigate();
  const navigateAddProduct = () => {
    navigate("/product/add");
    setNewProductAdded(!newProductAdded);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      if (response.status === 200) {
        const filteredProducts = response.data.map(
          ({ name, price, file_path }) => ({
            name,
            price,
            file_path,
          })
        );
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [newProductAdded]);

  return (
    <>
      <div className="shoppingPage-container">
        <div className="groupButton">
          <button className="addNewProduct" onClick={navigateAddProduct}>
            Add new product
          </button>
        </div>
        <ProductDisplay products={products} />
      </div>
    </>
  );
}

export default AllProductsPage;
