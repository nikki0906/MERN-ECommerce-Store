// src/pages/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        toast.error('Failed to load products.');
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  return (
    <div style={styles.container}>
      <h2>Admin Panel</h2>
      <ProductForm product={editProduct} setEditProduct={setEditProduct} />
      <h3>Existing Products</h3>
      <div>
        {products.map((product) => (
          <div key={product._id} style={styles.productItem}>
            <p>{product.name}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
  },
  productItem: {
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export default AdminPanel;