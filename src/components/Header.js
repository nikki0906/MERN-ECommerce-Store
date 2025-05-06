import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="header__top">
        <div className="header__logo">
          <h1>Amazon</h1>
        </div>
        <div className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart (0)</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;