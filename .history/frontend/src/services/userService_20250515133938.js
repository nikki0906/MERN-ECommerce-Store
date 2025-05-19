import axios from 'axios';

const API_URL = "http://localhost:5000/api/users";

// Fetch All Users
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};