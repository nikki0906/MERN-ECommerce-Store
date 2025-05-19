import axios from 'axios';

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};