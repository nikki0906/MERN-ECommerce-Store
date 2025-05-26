// routes/orderRoutes.js
import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { getUserOrders } from '../controllers/orderController.js';
import { addOrderItems, getMyOrders, updateOrderToPaid, razorpayWebhook } from '../controllers/orderController.js';
import { protect , admin } from '../middleware/authMiddleware.js';
import {getAllOrders, placeOrder, verifyPayment } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, createOrder, addOrderItems, updateOrderToPaid);
router.get('/myorders', protect, authMiddleware, getUserOrders, getMyOrders);

router.put('/:id/pay', protect, updateOrderToPaid);
router.post('/webhook', express.json({ type: 'application/json' }), razorpayWebhook);


router.get('/all', protect, admin, getAllOrders); // 👈 New Route for Admin
router.post('/', protect, placeOrder);
router.post('/verify', protect, verifyPayment);

export default router;