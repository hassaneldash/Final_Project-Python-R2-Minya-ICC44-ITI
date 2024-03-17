import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBuyerProducts.css';
import { useNavigate } from 'react-router-dom';
import SlideBarBuyer from '../Home Panel/SlideBarBuyer';

function AddBuyerProduct() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    category: '',
    inventory: '',
  });

  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://api-generator.retool.com/u9XTxw/data')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const validateFormData = (data) => {
    const errors = {};

    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!data.brand.trim()) {
      errors.brand = 'Brand is required';
    }
    if (!data.price.trim()) {
      errors.price = 'Price is required';
    } else if (isNaN(data.price)) {
      errors.price = 'Price must be a valid number';
    }
    if (!data.category.trim()) {
      errors.category = 'Category is required';
    }
   
    if (!data.inventory.trim()) {
      errors.inventory = 'Inventory is required';
    }

    return errors;
  };

  const handleAddProduct = () => {
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('https://api-generator.retool.com/u9XTxw/data', formData)
        .then(response => {
          setProducts([...products, response.data]);
          setFormData({
            name: '',
            brand: '',
            price: '',
            category: '',
            inventory: '',
          });
          loadData();
          navigate('/ShowBuyerProducts');
        })
        .catch(error => {
          if (error.response) {
            console.error('Server Error:', error.response.data);
          } else if (error.request) {
            console.error('No response from server');
          } else {
            console.error('Error:', error.message);
          }
          setErrors({ server: 'Error adding product. Please try again later.' });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const loadData = async () => {
    try {
      const res = await axios.get('https://api-generator.retool.com/u9XTxw/data');
      setProducts(res.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const displayError = (field) => {
    return errors[field] ? <div className="error-message">{errors[field]}</div> : null;
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        <SlideBarBuyer openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <form className="formclss" method="POST">
          <label className="labels">
            Name:
            <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            {displayError('name')}
          </label>
          <br />
          <label className="labels">
            Brand:
            <input type="text" name="brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
            {displayError('brand')}
          </label>
          <br />
          <label className="labels">
            Price:
            <input type="text" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            {displayError('price')}
          </label>
          <br />
         
          <label className="labels">
            Inventory:
            <input type="text" name="inventory" value={formData.inventory} onChange={(e) => setFormData({ ...formData, inventory: e.target.value })} />
            {displayError('inventory')}
          </label>
         
         
          <br />
          <button type="button" className="add-product-button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBuyerProduct;
