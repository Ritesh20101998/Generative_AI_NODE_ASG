const express = require('express');
const userRouter = express.Router();
const { signup, login, forgotPassword, resetPassword } = require('../controllers/user.controller');
const { validateSignup, validateResetToken } = require('../middleware/validation.middleware'); // Import your validation middleware

userRouter.get("/",(req,res)=>{
    res.send("Welcome to EMail Scheduling Application..")
})

// Signup route
userRouter.post('/signup', validateSignup, signup);

// Login route
userRouter.post('/login', login);

// Forgot Password route
userRouter.post('/forgot-password', forgotPassword);

// Reset Password route
userRouter.post('/reset-password', validateResetToken, resetPassword);

module.exports = userRouter;
