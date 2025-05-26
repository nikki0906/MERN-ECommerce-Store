import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cart);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const addToCart = async ({ productId, quantity }) => {
    try {
      const token = localStorage.getItem('token'); // ✅ Fixed: Added token definition
      const res = await axios.post(
        '/api/cart/add',
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart(); // Optional: Refresh cart after adding
    } catch (err) {
      console.error('Error adding to cart', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchCart(); // update cart after remove
    } catch (err) {
      console.error('Remove from cart failed:', err);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems([]);
    } catch (err) {
      console.error('Clear cart failed:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};