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
        <Link to="/">Home</Link>
      <Link to="/products">Product Listing</Link>
      <Link to="/users">User Listing</Link>
      </div>

      {/* Search Bar */}
      <div className="navbar__search">
        <input type="text" placeholder="Search..." />
        <button className="navbar__searchButton">Search</button>
      </div>

      {/* Links and Cart */}
      <div className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/cart" className="navbar__cart">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33yFKFOQOLGIuLlE561R5UNHAoitYY3ivpA&s"
            alt="Cart"
            style={{ width: '45px', height: '30px', marginLeft: '5px'}} // Inline CSS
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