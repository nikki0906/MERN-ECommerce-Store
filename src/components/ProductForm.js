// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductForm = ({ product, setEditProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = product ? `/api/products/${product._id}` : '/api/products';
    const method = product ? 'put' : 'post';

    try {
      await axios[method](url, formData);
      toast.success(product ? 'Product updated!' : 'Product added!');
      setEditProduct(null); // Clear the edit form
    } catch (error) {
      toast.error('Failed to submit product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>{product ? 'Edit Product' : 'Add Product'}</h3>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '500px',
    margin: '2rem auto',
  },
};

export default ProductForm;