// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', user);
      toast.success('Registered! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed');
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