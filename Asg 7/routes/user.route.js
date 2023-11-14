const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const validationMiddleware = require('../middleware/validation.middleware');
const authMiddleware = require('../middleware/auth.middleware');

// User Registration
userRouter.post('/register', validationMiddleware.validateRegistration, userController.register);

// User Login
userRouter.post('/login', validationMiddleware.validateLogin, userController.login);

// Fetch User Details (Protected route, requires a valid JWT token)
userRouter.get('/details', authMiddleware.verifyToken, userController.getUserDetails);

//filter route
userRouter.get("/",authMiddleware.verifyToken, userController.filterUsers);

module.exports = userRouter;
