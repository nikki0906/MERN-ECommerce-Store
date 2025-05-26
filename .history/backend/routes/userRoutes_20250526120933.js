import express from 'express';
import { getAllUsers, deleteUser ,updateUser} from '../controllers/userController.js';
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authUser, registerUser } from '../controllers/userController.js';
import {registerUser, loginUser, logoutUser, getUserProfile} from '../controllers/authController.js';

const router = express.Router();

router.get('/', getAllUsers);          // List
router.delete('/:id', deleteUser);     // Delete
router.put('/:id', updateUser); // 👈 Add this
router.get('/profile', protect, getUserProfile);

router.post('/login', loginUser);  // POST /api/users/login
router.post('/register', registerUser);  // POST /api/users/register

router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile); // ⬅️ New protected route

export default router;