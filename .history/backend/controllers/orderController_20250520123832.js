import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ===========================================
// 🚀 1️⃣ Add Order Items
// ===========================================
export const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// ===========================================
// 🚀 2️⃣ Get My Orders
// ===========================================
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// ===========================================
// 🚀 3️⃣ Update Order to Paid (After Razorpay Payment)
// ===========================================
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.paymentResult.razorpay_payment_id,
      status: 'Completed',
      update_time: new Date().toISOString(),
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// ===========================================
// 🚀 4️⃣ Razorpay Webhook Handler
// ===========================================
export const razorpayWebhook = asyncHandler(async (req, res) => {
  const { payload } = req.body;

  if (payload && payload.payment) {
    const payment = payload.payment.entity;

    if (payment.status === 'captured') {
      const orderId = payment.notes.order_id;  // This is the order_id we saved during Razorpay order creation
      const order = await Order.findById(orderId);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: payment.id,
          status: 'Completed',
          update_time: new Date().toISOString(),
        };

        await order.save();
        console.log(`Order ${orderId} marked as paid!`);
      }
    }
  }
  res.status(200).json({ status: 'ok' });
});

// ==============================================
// 🚀 Handle WebHook
// ==============================================
export const handleWebhook = async (req, res) => {
  const { event, payload } = req.body;

  if (event === "payment.captured") {
    const paymentData = payload.payment.entity;

    // Save this data in your Order model
    const newOrder = new Order({
      userId: paymentData.notes.userId, // assuming you passed userId in notes
      amount: paymentData.amount / 100,
      paymentId: paymentData.id,
      status: paymentData.status,
      currency: paymentData.currency,
      method: paymentData.method,
      receipt: paymentData.receipt,
      createdAt: paymentData.created_at,
    });

    await newOrder.save();
  }

  res.status(200).json({ success: true });
};

// ==============================================
// 🚀 get user orders
// ==============================================

export const getUserOrders = async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  res.json(orders);
};

// ==============================================
// 🚀 get all orders 
// ==============================================

// GET /api/orders/all
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'name email') // Get user name and email
    .sort({ createdAt: -1 });

  res.json(orders);
});