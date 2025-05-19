import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const cartItemCount = cart?.length || 0;

  return (
    <div className="navbar">
      {/* Amazon Logo */}
      <div className="navbar__logo">
        <Link to="/">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
            alt="Amazon Logo"
            className="navbar__logoImage"
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="navbar__search">
        <input
          type="text"
          placeholder="Search for products, brands, and more..."
          className="navbar__searchInput"
        />
        <button className="navbar__searchButton">Search</button>
      </div>

      {/* Navigation Links */}
      <div className="navbar__links">
        <Link to="/" className="navbar__link">Home</Link>
        <Link to="/add-product" className="navbar__link">Add Product</Link>
        <Link to="/orders" className="navbar__link">Orders</Link>
        <Link to="/account" className="navbar__link">Account</Link>

        {/* Cart Icon */}
        <Link to="/cart" className="navbar__cart">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33yFKFOQOLGIuLlE561R5UNHAoitYY3ivpA&s"
            alt="Cart"
            className="navbar__cartIcon"
          />
          {cartItemCount > 0 && (
            <span className="navbar__cartCount">{cartItemCount}</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;