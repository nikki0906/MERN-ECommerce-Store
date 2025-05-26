import express from 'express';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import {  protect } from '../middleware/authMiddleware.js';
import { restoreProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.put('/products/restore/:id', restoreProduct);

router.post('/', (req, res) => {
  console.log('Request Body:', req.body);
  addProduct(req, res);
});

router.post('/', protect, admin, createProduct); // Create Product
router.put('/:id', protect, admin, updateProduct); // Edit Product
router.delete('/:id', protect, admin, deleteProduct); // Delete Product

export default router;