
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Import the User model
require('dotenv').config();

// Signup Controller
const signup = async (req, res) => {
  const { username, mobile, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = new User({ username, mobile, email, password: hashedPassword });
    await user.save();

    // Generate a JWT token for user authentication
    const token = jwt.sign({ userId: user._id }, process.env.secret_key, {
      expiresIn: '1h', // Set the token expiration time as needed
    });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate a JWT token for user authentication
      const token = jwt.sign({ userId: user._id }, process.env.secret_key, {
        expiresIn: '1h', // Set the token expiration time as needed
      });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Forgot Password Controller
const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Generate a JWT reset token
      const resetToken = jwt.sign({ userId: user._id }, 'your-reset-secret-key', {
        expiresIn: '1h', // Set the token expiration time for reset as needed
      });
  
      // Store the reset token in the user's record
      user.resetToken = resetToken;
      await user.save();
  
      // Send the reset token to the user's email (not shown in this example)
  
      res.status(200).json({ message: 'Reset token sent to your email' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
// Reset Password Controller
const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;
  
    try {
      // Verify and decode the reset token
      const decodedToken = jwt.verify(resetToken, process.env.reset_secret_key);
  
      if (!decodedToken) {
        return res.status(401).json({ error: 'Invalid reset token' });
      }
  
      // Find the user by the decoded token's user ID
      const user = await User.findById(decodedToken.userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update the user's password and reset token
      user.password = hashedPassword;
      user.resetToken = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
  signup, login, forgotPassword, resetPassword 
};
