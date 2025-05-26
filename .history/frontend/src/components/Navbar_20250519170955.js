import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const cartItemCount = cart?.length || 0;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile on load
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
          setUser(data);
        } catch (error) {
          console.log('Failed to fetch user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

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
        <input type="text" placeholder="Search..." />
        <button className="navbar__searchButton">Search</button>
      </div>

      {/* Links and Cart */}
      <div className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/add-product">Add Product</Link>
        
        {user ? (
          <>
            <Link to="/profile">{user.name}</Link>
            <Link to="/orders">My Orders</Link>
            <button className="navbar__logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        <Link to="/cart" className="navbar__cart">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ33yFKFOQOLGIuLlE561R5UNHAoitYY3ivpA&s"
            alt="Cart"
            style={{ width: '45px', height: '30px', marginLeft: '5px' }}
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