// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.js';

import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts or newProductAdded state changes
    fetch('http://localhost:5000/api/products') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        setProducts(data.products || data); // Set fetched products
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  return (
    <div className="homePage">
      <div className="homePage__banner">
        <h1> . </h1>
      </div>

      <div className="homePage__filters">
        <h3>Category:</h3>
        <select>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
                    <option value="mobile">Mobile</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="home">Home</option>
          <option value="toys">Toys</option>
          <option value="sports">Sports</option>
          <option vallue="grocery">Grocery</option>
          <option value="furniture">Furniture</option>
          <option value="beauty">Beauty</option>
          <option value="automative">Automative</option>
          <option value="health">Health</option>
          <option value="pet">Pet</option>
          <option value="stationery">Stationery</option>
          <option value="jewellery">Jewellery</option>
          <option value="footwear">Footwear</option>
          <option value="accessories">Accessories</option>
          <option value="kitchen">Kitchen</option>
          <option value="garden">Garden</option>
          <option value="outdoor">Outdoor</option>
        </select>
        
        <h3>Price:</h3>
        <select>
          <option value="all">All</option>
          <option value="under1000">Under ₹1000</option>
          <option value="under5000">Under ₹5000</option>
        </select>
      </div>

      <div className="homePage__productList">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;