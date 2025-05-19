import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AddProductPage from '../pages/AddProductPage.js';
import EditProductPage from '../pages/EditProductPage.js';
import ProductList from '../components/ProductList.js';
import UserList from '../components/UserList.js';

const AdminRoutes = ({ isAdmin }) => {
    if (!isAdmin) {
        return <Navigate to="/" />; // Redirect non-admin users to the home page
    }

    return (
        <Routes>
            <Route path="/admin/products/add" element={<AddProductPage />} />
            <Route path="/admin/products/edit/:id" element={<EditProductPage />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/users" element={<UserList />} />
            {/* You can add more admin-specific routes here */}
        </Routes>
    );
};

export default AdminRoutes;