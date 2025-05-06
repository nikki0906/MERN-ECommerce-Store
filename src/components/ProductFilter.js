import React from 'react';

const ProductFilter = ({ onFilterChange }) => {
  return (
    <div className="filter-box">
      <select onChange={(e) => onFilterChange('category', e.target.value)}>
        <option value="">All Categories</option>
        <option value="Mobiles">Mobiles</option>
        <option value="Earphones">Earphones</option>
        <option value="Laptops">Laptops</option>
        <option value="TV">TV</option>
      </select>
      <select onChange={(e) => onFilterChange('price', e.target.value)}>
        <option value="">All Prices</option>
        <option value="1000">Under ₹1000</option>
        <option value="10000">Under ₹10,000</option>
        <option value="50000">Under ₹50,000</option>
      </select>
    </div>
  );
};

export default ProductFilter;