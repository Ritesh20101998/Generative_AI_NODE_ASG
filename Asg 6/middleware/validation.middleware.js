// middleware/validation.js

const { check, validationResult } = require('express-validator');
require('dotenv').config();

// Validate user signup data
const validateSignup = [
  check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  check('mobile').isMobilePhone().withMessage('Invalid mobile number'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware to validate the reset token
const validateResetToken = (req, res, next) => {
    const { resetToken } = req.body;
  
    if (!resetToken) {
      return res.status(400).json({ error: 'Reset token is required' });
    }
  
    try {
      // Verify and decode the reset token
      const decodedToken = jwt.verify(resetToken, process.env.reset_secret_key);
  
      if (!decodedToken) {
        return res.status(401).json({ error: 'Invalid reset token' });
      }
  
      // Attach the decoded token to the request for use in the resetPassword controller
      req.decodedResetToken = decodedToken;
  
      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
  validateSignup, validateResetToken
};
