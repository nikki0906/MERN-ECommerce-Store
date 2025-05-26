import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user and return token
router.post('/login', loginUser);

// @route   POST /api/auth/logout
// @desc    Logout the user
router.post('/logout', logoutUser);

export default router;