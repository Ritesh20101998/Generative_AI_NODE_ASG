// feedbackModel.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  feedbackText: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
},{
  versionKey:false
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
