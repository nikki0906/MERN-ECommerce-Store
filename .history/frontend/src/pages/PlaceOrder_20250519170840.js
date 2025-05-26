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

  <button onClick={handlePayment}>Pay Now</button>

  const handlePayment = async () => {
  try {
    const { data } = await axios.post(
      'http://localhost:5000/api/payments/order',
      { amount: totalPrice },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      handler: function (response) {
        alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error('Payment Failed:', error);
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