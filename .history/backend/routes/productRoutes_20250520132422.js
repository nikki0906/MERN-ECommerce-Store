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

router.post('/', protect, addProduct); // Create Product
router.put('/:id', protect, updateProduct); // Edit Product
router.delete('/:id', protect, deleteProduct); // Delete Product

export default router;