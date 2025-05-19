// backend/routes/adminRoutes.js
import express from 'express';
const router = express.Router();

// Example of an admin route
router.get('/dashboard', (req, res) => {
  // Authorization check to verify if the user is an admin
  if (!req.user || !req.user.isAdmin) {
    // Sending an error message as a JSON response
    return res.status(403).json({ message: 'Access Denied: You are not authorized to view this page.' });
  }
  
  // If the user is an admin, proceed with the admin functionality
  res.json({ message: 'Welcome to the admin dashboard' });
});

export default router;