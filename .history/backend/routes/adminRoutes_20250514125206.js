// frontend/src/routes/adminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from '../components/UserList';
import ProductList from '../components/ProductList';
import AddProductPage from '../pages/AddProductPage';
import EditProductPage from '../pages/EditProductPage';
import NotFoundPage from '../pages/NotFoundPage';

const adminRoutes = ({ isAdmin }) => {
  if (!isAdmin) {
    return <NotFoundPage />;
  }

  return (
    <Routes>
      <Route path="users" element={<UserList />} />
      <Route path="products" element={<ProductList />} />
      <Route path="products/add" element={<AddProductPage />} />
      <Route path="products/edit/:id" element={<EditProductPage />} />
    </Routes>
  );
};

export default adminRoutes;