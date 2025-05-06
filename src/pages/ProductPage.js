// src/pages/ProductPage.js
import React, { useState } from 'react';
import './ProductPage.css';

const ProductPage = ({ product }) => {
  const [review, setReview] = useState('');

  const handleSubmitReview = () => {
    console.log('Review Submitted:', review);
    setReview('');
  };

  return (
    <div className="productPage">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <textarea 
        placeholder="Write a review..." 
        value={review} 
        onChange={(e) => setReview(e.target.value)} 
      />
      <button onClick={handleSubmitReview}>Submit Review</button>
    </div>
  );
};

export default ProductPage;