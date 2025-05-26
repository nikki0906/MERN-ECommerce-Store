import React, { useEffect, useState } from 'react';
import './CartPage.css';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CartPage = () => {
  const { cartItems = [], removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const price = cartItems.reduce((acc, item) => {
      const itemPrice = Number(item.price) || 0;
      const itemCount = Number(item.count) || 1; // fallback count = 1
      return acc + itemPrice * itemCount;
    }, 0);
    setTotalPrice(price);
  }
}, [cartItems]);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token'); // ✅ Get saved token

    try {
      const response = await axios.post(
        'http://localhost:5000/api/payments/order',
        {
          amount: totalPrice, // ₹ amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token in header
          },
        }
      );

      const order = response.data;
      console.log('Razorpay order received:', order);  // <== Add this to debug

      const options = {
        key: 'rzp_test_HoJv5rxW53AMqA', // ✅ Your Razorpay key_id
        amount: order.amount,
        currency: order.currency,
        name: 'Your Store',
        description: 'Payment for your cart items',
        order_id: order.id,
        handler: function (response) {
          alert('Payment successful!');
          clearCart();
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
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Payment failed!');
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
            <div className="cartPage__product" key={item._id}>
              <img src={item.image} alt={item.name} className="cartPage__productImage" />
              <div className="cartPage__productInfo">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div className="cartPage__productQuantity">
                  <label>Quantity:</label>
                  <input type="number" value={item.count} readOnly />
                </div>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
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