// routes/orderRoutes.js
import express from 'express';
import { getUserOrders } from '../controllers/orderController.js';
import { addOrderItems, getMyOrders, updateOrderToPaid, razorpayWebhook } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import {getAllOrders} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, addOrderItems, updateOrderToPaid);
router.get('/myorders', protect, getUserOrders, getMyOrders);

router.put('/:id/pay', protect, updateOrderToPaid);
router.post('/webhook', express.json({ type: 'application/json' }), razorpayWebhook);


router.get('/all', protect , getAllOrders); // 👈 New Route for Admin);

export default router;