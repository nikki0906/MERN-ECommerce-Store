import express from 'express';
import { getAllProducts, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 🔹 Get All Products
router.get('/', getAllProducts);

// 🔹 Delete Product by ID (Admin Only)
router.delete('/:id', protect, admin, deleteProduct);

export default router;