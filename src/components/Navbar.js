// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // Use the custom hook
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();  // Access cart from context
  const cartItemCount = cart.length;

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src="data:image/png;base64,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" alt="Amazon Logo" />
        </Link>
      </div>

      <div className="navbar__search">
        <input type="text" placeholder="Search..." />
        <button className="navbar__searchButton">Search</button>
      </div>

      <div className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/cart">
          Cart
          {cartItemCount > 0 && (
            <span className="navbar__cartCount">{cartItemCount}</span>
          )}
        </Link>
        <Link to="/add-product">Add Product</Link>
      </div>
    </div>
  );
};

export default Navbar;