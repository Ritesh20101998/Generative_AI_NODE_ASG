// emailConfig.js
require('dotenv').config()

module.exports = {
    service: 'Gmail', // e.g., 'gmail'
    user: process.env.gmail, 
    pass: process.env.pass
};
  