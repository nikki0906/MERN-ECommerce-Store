import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../services/productService';
import ProductCard from './ProductCard';
import './ProductListing.css';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchAllProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div className="product-listing-page">
      <h2>Product Listings</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;