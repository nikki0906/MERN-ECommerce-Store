// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.js';
import HomeBannerCarousel from '../components/HomeBannerCarousel.js';

import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products || data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);
  
  // Filtering Logic
  useEffect(() => {
    let filtered = products;

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (priceRange !== "all") {
      filtered = filtered.filter((product) => {
        if (priceRange === "under1000") return product.price < 1000;
        if (priceRange === "under5000") return product.price < 5000;
        if (priceRange === "above5000") return product.price >= 5000;
        return true;
      });
    }

    setFilteredProducts(filtered);
  }, [category, priceRange, products]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homePage">

      <div className="homePage__banner">
        <HomeBannerCarousel />
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