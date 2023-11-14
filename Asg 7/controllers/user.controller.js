const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

// User Registration Controller
exports.register = async(req, res) => {
    try {
        const {
          first_name,
          last_name,
          email,
          mobile,
          password,
          role,
          status,
        } = req.body;
    
        // Check for duplicate email/mobile
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(501).json({ status: 501, message: 'Email already exists' });
        }
    
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
    
        // Create a new user
        const newUser = new User({
          first_name,
          last_name,
          email,
          mobile,
          password: hashedPassword,
          role,
          status,
        });
    
        // Save the user to the database
        await newUser.save();
    
        return res.status(200).json({ status: 200, message: 'Account successfully created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

// User Login Controller
exports.login = async(req, res) => {
    try {
        const { email, password, role } = req.body;
    
        // Find the user by email
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(501).json({ status: 501, message: 'Invalid credentials' });
        }
    
        // Check if the user's role matches the requested role
        if (user.role !== role) {
          return res.status(501).json({ status: 501, message: 'Invalid role' });
        }
    
        // Verify the password
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(501).json({ status: 501, message: 'Invalid credentials' });
        }
    
        // Generate a JWT token with user details
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.secret, // Replace with a strong secret key
          { expiresIn: '30d' }
        );
        // console.log(token)
    
        res.status(200).json({
          status: 200,
          message: 'Logged in successfully',
          data: {
            userDetails: {
              id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              mobile: user.mobile,
              role: user.role,
              status: user.status,
            },
            token,
          },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

// Fetch User Details Controller
exports.getUserDetails = (req, res) => {
    // Extract user details from the JWT token
    const { id, role } = req.user;

    // Fetch user details based on the role
    User.findById(id, (err, user) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }

        if (!user) {
        return res.status(501).json({ status: 501, message: 'User not found' });
        }

        // Ensure the user's role matches the requested role
        if (user.role !== role) {
        return res.status(501).json({ status: 501, message: 'Invalid role' });
        }

        res.status(200).json({
        status: 200,
        data: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            status: user.status,
        },
        });
    });
}

// Filter Users Controller
exports.filterUsers = (req, res) => {
    const { name, email, mobile, status, role } = req.query;
    const filter = {};
  
    if (name) filter.$text = { $search: name };
    if (email) filter.email = email;
    if (mobile) filter.mobile = mobile;
    if (status) filter.status = status;
    if (role) filter.role = role;
  
    User.find(filter, (err, users) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    
        res.status(200).json({ status: 200, data: users });
    });
}

