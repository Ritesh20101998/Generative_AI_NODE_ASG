const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Delivered', 'Failed'],
    default: 'Scheduled',
  },
  // Add more fields as needed, e.g., error details, delivery time, etc.
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
