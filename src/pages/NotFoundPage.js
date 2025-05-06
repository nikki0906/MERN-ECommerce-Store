// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '100px 20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  heading: {
    fontSize: '3rem',
    color: '#333'
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    color: '#666'
  },
  link: {
    textDecoration: 'none',
    backgroundColor: '#0077cc',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px'
  }
};

export default NotFoundPage;