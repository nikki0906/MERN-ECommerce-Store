import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const { search } = useLocation(); // e.g. ?q=shoes
  const query = new URLSearchParams(search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/search?q=${query}`);
        setResults(data);
      } catch (err) {
        console.error('Search failed:', err);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Search Results for "{query}"</h2>
      <div className="product-list">
        {results.length > 0 ? (
          results.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;