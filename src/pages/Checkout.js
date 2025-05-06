// src/pages/Checkout.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const totalAmount = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <h3>Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                {product.name} - ₹{product.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>Total: ₹{totalAmount}</h3>
        <button>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Checkout;