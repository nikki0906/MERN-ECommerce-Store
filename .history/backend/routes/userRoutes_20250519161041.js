import express from 'express';
import { getAllUsers, deleteUser ,updateUser} from '../controllers/userController.js';
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllUsers);          // List
router.delete('/:id', deleteUser);     // Delete
router.put('/:id', updateUser); // 👈 Add this

router.get('/profile', protect, getUserProfile);

export default router;