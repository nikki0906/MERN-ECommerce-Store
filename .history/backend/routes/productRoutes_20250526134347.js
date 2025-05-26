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
router.get("/search", searchProducts);
router.get('/:id', getProductById);

router.put('/products/restore/:id', restoreProduct);

router.post('/', (req, res) => {
  console.log('Request Body:', req.body);
  addProduct(req, res);
});

// routes/productRoutes.js
router.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const results = await Product.find({
      name: { $regex: query, $options: 'i' }, // case-insensitive partial match
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

router.post('/', protect, addProduct); // Create Product
router.put('/:id', protect, updateProduct); // Edit Product
router.delete('/:id', protect, deleteProduct); // Delete Product

export default router;