const User = require("../models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    // secure : true,
    auth: {
      user: 'antonetta6@ethereal.email',
      pass: 'KRSQCht8WDAuUuYcfW',
    },
});
  

//signup controller
const signup = async(req,res) => {
    try{
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({firstName, lastName, email, password:hashPassword,});

        await newUser.save()

        // Send welcome email
        const mailOptions = {
            from: 'antonetta6@ethereal.email',
            to: email,
            subject: 'Welcome to My App',
            text: `Hi ${firstName}, welcome to My App!`,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email sending failed:', error);
                res.send("mail failed")
            } else {
                console.log('Email sent:', info.response);
                console.log(`Email Send to ${email}`)
                res.send("mail send..")
            }
        });

        res.status(201).json({ "message": 'User created successfully',
        "user" : newUser
        });

    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//login controller 
const login  = async(req,res)=> {
    const {email, password} =  req.body;
    const user = await User.findOne({ email });

    if(!user){
        return res.status(401).send({message : 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign({ userId: user._id }, process.env.secretKey, {
          expiresIn: '1h', // Token expiration time
        });
    
        res.status(200).json({"message":"user login successfully", "token" : token });
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
}

module.exports = {signup, login};