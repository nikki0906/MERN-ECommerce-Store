import React, { useEffect, useState } from 'react';
import './CartPage.css';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems = [], removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const price = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
      setTotalPrice(price);
    }
  }, [cartItems]);

  return (
    <div className="cartPage">
      <div className="cartPage__left">
        <h2>Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div className="cartPage__product" key={item.id}>
              <img src={item.image} alt={item.name} className="cartPage__productImage" />
              <div className="cartPage__productInfo">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div className="cartPage__productQuantity">
                  <label>Quantity:</label>
                  <input type="number" value={item.count} readOnly />
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cartPage__right">
        <div className="cartPage__summary">
          <h3>Price Summary</h3>
          <p>Total Price: ₹{totalPrice}</p>
          <button onClick={clearCart}>Clear Cart</button>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;