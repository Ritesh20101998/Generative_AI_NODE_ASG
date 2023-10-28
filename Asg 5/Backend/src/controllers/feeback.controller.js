// feedbackController.js
const Feedback = require('../models/feedback.model');

exports.submitFeedback = async (req, res, next) => {
  const { name, email, feedbackText } = req.body;

  try {
    // Create a new feedback entry
    const feedback = new Feedback({
      name,
      email,
      feedbackText,
    });

    // Save the feedback in the database
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    next(error);
  }
};
