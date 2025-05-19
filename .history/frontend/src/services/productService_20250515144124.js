import axios from 'axios';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};