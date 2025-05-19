// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/admin/products`);
        setProducts(data);
      } catch (error) {
        toast.error("Failed to fetch products. Try again later.");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Search Filter
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Delete Product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/admin/products/${id}`);
        const { data } = await axios.get(`/api/admin/products`);
        setProducts(data);
        toast.success("Product deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete product.");
      }
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>

      {/* 🔹 Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className="product-list-header">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="add-button"
          onClick={() => window.location.href = "/admin/products/add"}
        >
          ➕ Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.countInStock}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => window.location.href = `/admin/products/edit/${product._id}`}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteProduct(product._id)}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;