import axios from 'axios';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};