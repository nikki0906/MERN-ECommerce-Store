// src/routes/AdminRoutes.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AddProductPage from '../pages/AddProductPage';
import ProductEditPage from '../pages/ProductEditPage';  // ✅ Import the Edit Page
import UserList from '../components/UserList';
import ProductList from '../components/ProductList';

const AdminRoutes = ({ isAdmin }) => {
  if (!isAdmin) {
    return <Navigate to="/" />; // Redirect non-admin users to the home page
  }

  return (
    <Routes>
      <Route path="/admin/products/add" element={<AddProductPage />} />
      <Route path="/admin/products/edit/:id" element={<ProductEditPage />} />
      <Route path="/admin/products" element={<ProductList />} />
      <Route path="/admin/users" element={<UserList />} />
      {/* You can add more admin-specific routes here */}
    </Routes>
  );
};

export default AdminRoutes;