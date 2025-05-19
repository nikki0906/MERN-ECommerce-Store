import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.js';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProductAdded, setNewProductAdded] = useState(false);

  // Fetch products when the component mounts or newProductAdded state changes
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
  }, [newProductAdded]);

  // Add a new product
  const handleAddProduct = async (newProductData) => {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
      });

      const result = await response.json();
      console.log('Product added:', result);

      if (response.ok) {
        setNewProductAdded(!newProductAdded);
      } else {
        console.log('Failed to add product:', result);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Show loading spinner or message until data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homePage">
      <div className="homePage__banner">
        <h1></h1>
      </div>

      {/* Filters */}
      <div className="homePage__filters">
        <h3>Category:</h3>
        <select>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
          <option value="mobile">Mobile</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home</option>
          <option value="toys">Toys</option>
          <option value="sports">Sports</option>
          <option value="grocery">Grocery</option>
          <option value="furniture">Furniture</option>
          <option value="beauty">Beauty</option>
          <option value="automotive">Automotive</option>
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

      {/* Add Product Button */}
      <div className="homePage__addProduct">
        <button
          onClick={() =>
            handleAddProduct({
              name: "Sample Product",
              price: 999,
              category: "electronics",
              description: "A brand new electronic item",
              image: "https://via.placeholder.com/150"
            })
          }
        >
        </button>
      </div>

      {/* Product List */}
      <div className="homePage__productList">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;