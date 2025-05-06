// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create CartContext with default value
const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

// Create CartProvider to wrap your components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to access CartContext
export const useCart = () => useContext(CartContext);