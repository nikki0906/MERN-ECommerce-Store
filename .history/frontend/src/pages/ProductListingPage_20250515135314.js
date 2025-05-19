import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../services/productService';
import ProductCard from './ProductCard';
import './ProductListingPage.css';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="product-listing-page">
      <h2>All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;