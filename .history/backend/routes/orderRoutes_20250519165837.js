// routes/orderRoutes.js
import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { getUserOrders } from '../controllers/orderController.js';
import { addOrderItems, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder, addOrderItems);
router.get('/myorders', protect, getUserOrders, getMyOrders);

export default router;