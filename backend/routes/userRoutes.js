import express from 'express';
import { getAllUsers, deleteUser ,updateUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);          // List
router.delete('/:id', deleteUser);     // Delete
router.put('/:id', updateUser); // 👈 Add this

export default router;