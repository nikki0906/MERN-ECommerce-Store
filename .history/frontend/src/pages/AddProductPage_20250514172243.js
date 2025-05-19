import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', formData);
      toast.success('Product added successfully!');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed to add product.');
    }
  };

  return (
    <div className="add-product-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Price (USD):</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Category:</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;