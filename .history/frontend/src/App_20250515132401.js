// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage'; 
import { CartProvider } from './context/CartContext';
import './App.css';
import AdminRoutes from './routes/AdminRoutes';
import UserListingPage from './pages/UserListingPage';
import ProductListingPage from './pages/ProductListingPage';

const App = () => {
  const isAdmin = true; // This should be dynamically set based on the user role (could come from context or local storage)

  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/admin/products/edit/:id" element={<EditProductPage />} />
          <Route path="/admin/products/add" element={<AddProductPage />} />
          <Route path="/admin/users" element={<UserListingPage />} />
          <Route path="/admin/products" element={<ProductListingPage />} />

          {/* Admin route */}
          <Route path="/admin/*" element={<AdminRoutes isAdmin={isAdmin} />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;