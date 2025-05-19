import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../services/productService';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      if (response.success) {
        setProducts(response.data);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductListingPage;