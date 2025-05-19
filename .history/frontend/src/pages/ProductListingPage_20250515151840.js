import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';
import CategoryFilter from '../components/CategoryFilter';
import PriceRangeFilter from '../components/PriceRangeFilter';
import './ProductListing.css';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = ["Electronics", "Books", "Clothing", "Home Appliances"];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts();
        // Defensive: if API returns { products: [...] }
        setProducts(data.products || data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category ? product.category === category : true) &&
      (minPrice ? product.price >= Number(minPrice) : true) &&
      (maxPrice ? product.price <= Number(maxPrice) : true)
    );
  });

  return (
    <div className="product-listing-page">
      <h2>All Products</h2>
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryFilter category={category} setCategory={setCategory} categories={categories} />
      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;