import React from 'react';
import './SearchFilter.css';

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;