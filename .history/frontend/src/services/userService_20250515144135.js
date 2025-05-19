import axios from 'axios';

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};