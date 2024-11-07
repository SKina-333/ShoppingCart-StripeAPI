
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./addProductPage.css";

import InputGroup from '../../../components/inputGroup.jsx'

function AddProductPage() {


  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("image", formData.image);


    await axios.post("http://localhost:5000/products/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(
      function(res)  {
        if(res.status === 201) {
          console.log("Successfully send data to backend")
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  };

 
  const navigate = useNavigate();
  const navigateShopPage = () => {
    navigate("/product/show-all");
  };

  return (
    <>
      <div className="addProduct-container">
        <div className="groupButton">
          <button className="addProduct" onClick={navigateShopPage}>Back to Shop</button>
        </div>
        <div className="input-container">
          <InputGroup name="name" labelName="Product Name" placeholder="Name of the product" type="text" value={formData.name} onChange={handleChange}/>
          <InputGroup name="price" labelName="Product Price" placeholder="Cost of the product" type="number" value={formData.price} onChange={handleChange}/>
          <InputGroup name="quantity" labelName="Product Amount" placeholder="Product Count" type="number" value={formData.quantity} onChange={handleChange}/>
          <InputGroup name="image" labelName="Upload Product Picture" type="file" onChange={handleChange}/>

          <button className="submitButton" onClick={handleSubmit}>Add Product</button>
        </div>
      </div>
    </>
  );
}

export default AddProductPage;
