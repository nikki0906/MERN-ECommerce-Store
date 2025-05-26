import React, { useEffect, useState } from 'react';
import './CartPage.css';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CartPage = () => {
  const { cartItems = [], removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const price = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
      setTotalPrice(price);
    }
  }, [cartItems]);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token'); // assuming you're storing JWT

      const { data: order } = await axios.post(
        '/api/payments/order',
        { amount: totalPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Set in .env
        amount: order.amount,
        currency: 'INR',
        name: 'My Store',
        description: 'Test Transaction',
        order_id: order.id,
        handler: function (response) {
          alert('Payment successful!');
          clearCart(); // optional
        },
        prefill: {
          name: 'Nikita Tiwari',
          email: 'nikita@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Checkout Error:', err);
      alert('Something went wrong');
    }
  };

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
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;