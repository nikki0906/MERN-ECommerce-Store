// src/pages/AddProductPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/products', product);  // Adjust with your API endpoint
      navigate('/admin/products');  // Redirect to product list
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={product.category} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input type="text" name="image" value={product.image} onChange={handleChange} required />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;