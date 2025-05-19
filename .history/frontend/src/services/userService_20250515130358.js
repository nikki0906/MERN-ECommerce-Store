import axios from 'axios';

export const getAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false };
  }
};