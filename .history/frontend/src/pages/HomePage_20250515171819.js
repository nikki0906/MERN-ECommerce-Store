import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.js';
import './HomePage.css';

const socket = io('http://localhost:5000');

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data.products || data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🌟 Handle delete
  const handleDeleteProduct = (product) => {
    setProducts((prevProducts) => 
      prevProducts.filter((p) => p._id !== product._id)
    );
    setDeletedProducts((prev) => [...prev, product]);
  };

  // 🌟 Handle restore
  const handleRestoreProduct = (product) => {
    setDeletedProducts((prev) => prev.filter((p) => p._id !== product._id));
    const updatedProducts = [...products];
    const index = product.originalIndex;
    updatedProducts.splice(index, 0, product); // Restore to original position
    setProducts(updatedProducts);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homePage">
      <div className="homePage__banner">
        <h1></h1>
      </div>

      <div className="homePage__productList">
        {products.map((product, index) => (
          <ProductCard
            key={product._id}
            product={{ ...product, originalIndex: index }}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {deletedProducts.length > 0 && (
        <div className="restore-section">
          <h3>Restore Deleted Products</h3>
          {deletedProducts.map((product) => (
            <div key={product._id} className="restore-item">
              <span>{product.name}</span>
              <button onClick={() => handleRestoreProduct(product)}>
                Restore
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;