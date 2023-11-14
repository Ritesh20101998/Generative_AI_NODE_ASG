const express = require('express');
const emailRouter = express.Router();
const Email = require('../models/email.model');
const { sendScheduledEmail } = require('../controllers/email.controller');

// Endpoint for scheduling an email
emailRouter.post('/schedule-email', async (req, res) => {
  try {
    const { recipientEmail, scheduledTime, subject, body } = req.body;

    const email = new Email({ recipientEmail, scheduledTime, subject, body });
    await email.save();

    res.status(201).json({ message: 'Email scheduled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint for sending scheduled emails
emailRouter.post('/send-scheduled-emails', async (req, res) => {
  try {
    const scheduledEmails = await Email.find({ status: 'Scheduled' });

    for (const email of scheduledEmails) {
      const currentTime = new Date();
      if (currentTime >= email.scheduledTime) {
        await sendScheduledEmail(email);
      }
    }

    res.status(200).json({ message: 'Scheduled emails sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = emailRouter;
