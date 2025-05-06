// src/components/FilterPanel.js
import React from 'react';

const FilterPanel = ({ onCategoryChange, onPriceChange }) => {
  return (
    <div style={{ padding: '1rem' }}>
      <h3>Filters</h3>
      <div>
        <label>Category:</label>
        <select onChange={onCategoryChange}>
          <option value="">All</option>
          <option value="mobile">Mobile</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>
      <div>
        <label>Price:</label>
        <select onChange={onPriceChange}>
          <option value="">All</option>
          <option value="low">Under ₹1000</option>
          <option value="mid">₹1000 - ₹5000</option>
          <option value="high">Above ₹5000</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;