import axios from 'axios';

export const getAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false };
  }
};