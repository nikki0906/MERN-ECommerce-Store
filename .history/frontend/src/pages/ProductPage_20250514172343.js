// pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/productService';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const loadProducts = async () => {
    try {
      const params = { keyword, category, brand, pageNumber: page };
      const data = await fetchProducts(params);

      setProducts(data.products);
      setPages(data.pages);
    } catch (error) {
      console.error('Failed to load products:', error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [keyword, category, brand, page]);

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={setKeyword} />
      <Filters
        onFilter={(type, value) => {
          if (type === 'category') setCategory(value);
          if (type === 'brand') setBrand(value);
          setPage(1); // Reset to first page when filter changes
        }}
      />
      <ProductList products={products} />
      <Pagination page={page} pages={pages} onPageChange={setPage} />
    </div>
  );
};

export default ProductPage;