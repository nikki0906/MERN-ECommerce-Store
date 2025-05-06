// src/components/ProductList.js
import React from 'react';
import ProductCard from './ProductCard';  // Make sure the path is correct
import './ProductList.css';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="productList">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductList;