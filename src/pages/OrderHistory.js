// src/pages/OrderHistory.js
import React, { useState, useEffect } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate fetching orders from an API
    const fetchedOrders = [
      { orderId: '123', date: '2025-05-01', status: 'Delivered', total: 500 },
      { orderId: '124', date: '2025-05-02', status: 'Shipped', total: 300 },
    ];
    setOrders(fetchedOrders);
  }, []);

  return (
    <div className="orderHistory">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>You have no previous orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="orderHistory__item">
            <div>Order ID: {order.orderId}</div>
            <div>Date: {order.date}</div>
            <div>Status: {order.status}</div>
            <div>Total: ₹{order.total}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;