import express from 'express';
import { createOrder } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js'; // verify JWT

const router = express.Router();

router.post('/order', protect, createOrder, authMiddleware);

export default router;