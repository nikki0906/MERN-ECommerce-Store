// src/api/userApi.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const loginUser = (data) => API.post('/api/users/login', data);
export const registerUser = (data) => API.post('/api/users/register', data);