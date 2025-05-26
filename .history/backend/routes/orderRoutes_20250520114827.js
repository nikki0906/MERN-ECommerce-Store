// routes/orderRoutes.js
import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { getUserOrders } from '../controllers/orderController.js';
import { addOrderItems, getMyOrders, updateOrderToPaid, razorpayWebhook } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder, addOrderItems, updateOrderToPaid);
router.get('/myorders', protect, authMiddleware, getUserOrders, getMyOrders);

router.put('/:id/pay', protect, updateOrderToPaid);
router.post('/webhook', express.json({ type: 'application/json' }), razorpayWebhook);

export default router;