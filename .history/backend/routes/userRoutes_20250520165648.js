import express from 'express';
import { getAllUsers, deleteUser ,updateUser} from '../controllers/userController.js';
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);          // List
router.delete('/:id', deleteUser);     // Delete
router.put('/:id', updateUser); // 👈 Add this
router.get('/profile', protect, getUserProfile);

router.post('/login', authUser);  // POST /api/users/login
router.post('/register', registerUser);  // POST /api/users/register

export default router;