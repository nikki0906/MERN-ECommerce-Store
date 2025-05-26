// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registration success:', response.data);
      alert('Registration successful! Please login.');
      // Redirect to login or clear form
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} style={styles.form}>
      <h2>Register</h2>
      <input placeholder="Name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} required />
      <input placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required />
      <input placeholder="Password" type="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} required />
      <button type="submit">Register</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '300px',
    margin: '2rem auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }
};

export default RegisterPage;