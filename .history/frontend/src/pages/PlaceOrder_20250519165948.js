import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const placeOrderHandler = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
        },
        config
      );

      console.log('Order placed successfully:', data);
      navigate('/orders'); // Redirect to My Orders
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  return (
    <div>
      <h2>Place Order</h2>

      <button onClick={placeOrderHandler}>Place Order</button>
    </div>
  );
};

export default PlaceOrder;