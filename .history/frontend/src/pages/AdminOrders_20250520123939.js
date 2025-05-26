// src/pages/AdminOrders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">User</th>
            <th className="p-2">Email</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Paid</th>
            <th className="p-2">Delivered</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="p-2">{order.user?.name}</td>
              <td className="p-2">{order.user?.email}</td>
              <td className="p-2">₹{order.totalPrice}</td>
              <td className="p-2">{order.isPaid ? '✅' : '❌'}</td>
              <td className="p-2">{order.isDelivered ? '✅' : '❌'}</td>
              <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;