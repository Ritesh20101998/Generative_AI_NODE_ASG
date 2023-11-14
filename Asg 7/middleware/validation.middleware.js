const bcrypt = require('bcryptjs');

// Validation middleware for user registration
function validateRegistration(req, res, next) {
  const {
    first_name,
    last_name,
    email,
    mobile,
    password,
    role,
    status,
  } = req.body;

  if (!first_name || !last_name || !email || !mobile || !password || !role || !status) {
    return res.status(501).json({ status: 501, message: 'All fields are mandatory' });
  }

  const mobileRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!mobile.match(mobileRegex) || !password.match(passwordRegex)) {
    return res.status(501).json({
      status: 501,
      message: 'Invalid mobile number or password format',
    });
  }

  next();
}

// Validation middleware for user login
function validateLogin(req, res, next) {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(501).json({ status: 501, message: 'All fields are mandatory' });
  }

  next();
}

module.exports = { validateRegistration, validateLogin };
