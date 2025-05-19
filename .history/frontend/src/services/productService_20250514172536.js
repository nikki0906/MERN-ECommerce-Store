// services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const fetchProducts = async (params) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error;
  }
};