const jwt = require('jsonwebtoken')
const { blacklist } = require('../blacklist');
require('dotenv').config();

// Middleware to verify JWT token
const verifyToken = async(req, res, next)=> {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: 401, message: 'Token is missing or invalid' });
  }
  

  //check the token is black listed or not
  if(blacklist.includes(token)){
    return res.status(401).json({msg:"Not authorized.."})
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(501).json({ status: 501, message: 'Token is missing or invalid' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
