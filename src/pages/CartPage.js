// src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';  // Import the useCart hook
import './CartPage.css';  // Ensure this path is correct

const CartPage = () => {
  const { cart, removeFromCart } = useCart();  // Destructure cart and removeFromCart from context

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="cartPage">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((product) => (
          <div key={product.id} className="cartItem">
            <img src={product.image} alt={product.name} className="cartItem__image" />
            <div className="cartItem__info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="cartItem__price">₹{product.price}</div>
              <button onClick={() => handleRemove(product.id)}>Remove from Cart</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;