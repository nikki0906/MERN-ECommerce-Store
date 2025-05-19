// src/services/productService.js
import axios from 'axios';

export const fetchProducts = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get('http://localhost:5000/api/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};