// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import SearchPage from './pages/SearchPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import AdminRoutes from './routes/AdminRoutes';
import UserListingPage from './pages/UserListingPage';
import ProductListingPage from './pages/ProductListingPage';
import ProtectedRoute from './components/ProtectedRoute';
import PlaceOrder from './pages/PlaceOrder';
import AdminOrders from './pages/AdminOrders';
import AdminProductList from './pages/AdminProductList';

const App = () => {
  const isAdmin = true;

  return (
    <AuthProvider>
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
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/admin/products" element={<AdminProductList />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />

            {/* Protected routes (user must be logged in) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<MyOrders />} />
            </Route>

            {/* Admin-only routes */}
            <Route path="/admin/*" element={<AdminRoutes isAdmin={isAdmin} />} />

            {/* Fallback route (optional) */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;