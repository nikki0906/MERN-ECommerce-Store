import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ category, setCategory, categories }) => {
  return (
    <div className="category-filter">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;