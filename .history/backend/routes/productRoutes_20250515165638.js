import express from 'express';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { restoreProduct } from '../controllers/productController.js';

const router = express.Router();

// GET all products
router.get('/', getAllProducts);

// GET product by ID
router.get('/:id', getProductById);

router.put('/products/restore/:id', restoreProduct);

// POST to add a new product
router.post('/', (req, res) => {
  console.log('Request Body:', req.body);  // Logging the body of the request for debugging
  addProduct(req, res);  // Calling the addProduct function
});

// PUT to update product by ID
router.put('/:id', updateProduct);

// DELETE to delete product by ID
router.delete('/:id', deleteProduct);

export default router;