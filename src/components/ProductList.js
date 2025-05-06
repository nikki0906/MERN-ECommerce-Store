import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace with your backend API endpoint for products
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="product-list">
      <h2>Bestsellers</h2>
      <div className="product-list__grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;