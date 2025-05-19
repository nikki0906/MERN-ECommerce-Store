// authController.js
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user in DB
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  // Validate password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Generate JWT Token
  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(200).json({ token, user });
};