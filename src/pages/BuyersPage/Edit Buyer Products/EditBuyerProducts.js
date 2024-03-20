import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SlideBarBuyer from "../Dashboard/SlideBarBuyer";

function EditBuyerProducts() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    Category: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message visibility
  const navigate = useNavigate();

  const validateFormData = (data) => {
    const errors = {};

    if (!data.title || data.title.trim() === "") {
      errors.title = "Name is required";
    }

    if (!data.brand || data.brand.trim() === "") {
      errors.brand = "Brand is required";
    }

    if (!data.price || isNaN(data.price)) {
      errors.price = "Price must be a valid number";
    }

    if (!data.category || data.category.trim() === "") {
      errors.category = "Category is required";
    }

    return errors;
  };

  const handleEditProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.put(
          // `https://api-generator.retool.com/u9XTxw/data/${id}`,
          `http://127.0.0.1:8000/products/${id}/`,
          formData
        );
        setShowSuccessMessage(true); // Show success message
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after 3 seconds
          navigate("/Dashboard");
        }, 3000);
      } catch (error) {
        console.error("Error updating product:", error);
        setErrors({
          server: "Error updating product. Please try again later.",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          // `https://api-generator.retool.com/u9XTxw/data/${id}`
          `http://127.0.0.1:8000/products/${id}/`
        );
        setFormData(response.data); // Set formData to populate input fields
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id]);

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const displayError = (field) => {
    return errors[field] ? (
      <div className="error-message">{errors[field]}</div>
    ) : null;
  };

  return (
    <>
      <div className="grid-container">
        <SlideBarBuyer
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />

        <form className="formclss" onSubmit={handleEditProduct}>
          <label>
            Name:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {displayError("name")}
          </label>
          <br />
          <label>
            Brand:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />
            {displayError("brand")}
          </label>
          <br />
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            {displayError("price")}
          </label>
          <br />
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.Category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            {displayError("category")}
          </label>
          <br />
          <button type="submit" className="add-product-button">
            Edit Product
          </button>
        </form>
      </div>
      {showSuccessMessage && (
        <div className="popuppp">
          <div className="popuppp-content">
            <p>Product edited successfully!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default EditBuyerProducts;
