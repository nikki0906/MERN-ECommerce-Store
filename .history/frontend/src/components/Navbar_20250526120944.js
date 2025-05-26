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
        <input type="text" className="navbar__searchInput" placeholder="Search..." />
        <button className="navbar__searchButton">Search</button>
      </div>

      {/* Links and Cart */}
      <div className="navbar__links">
        <Link to="/" className="navbar__link">Home</Link>
        <Link to="/add-product" className="navbar__link">Add Product</Link>

        {user ? (
          <>
            <Link to="/profile" className="navbar__link">{user.name}</Link>
            <Link to="/my-orders" className="navbar__link">My Orders</Link>
            {user.role === 'admin' && (
              <>
                <Link to="/admin/orders" className="navbar__link">Admin Orders</Link>
                <Link to="/admin/products" className="navbar__link">Manage Products</Link>
              </>
            )}
            <button className="navbar__logoutButton navbar__link" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/register" className="navbar__link">Register</Link>
          </>
        )}

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