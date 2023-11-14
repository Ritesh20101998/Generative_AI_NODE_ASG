const nodemailer = require('nodemailer');
const Email = require('../models/email.model');

// Function to send a scheduled email
const sendScheduledEmail = async (emailData) => {
  const transporter = nodemailer.createTransport({
    // Configure your SMTP settings here
    service: 'Gmail',
    auth: {
      user: process.env.email,
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: process.env.email,
    to: emailData.recipientEmail,
    subject: emailData.subject,
    text: emailData.body,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Update the email status to 'Delivered' in the database
    await Email.findByIdAndUpdate(emailData._id, { status: 'Delivered' });

    return true; // Email sent successfully
  } catch (error) {
    console.error('Error sending email:', error);

    // Update the email status to 'Failed' in the database
    await Email.findByIdAndUpdate(emailData._id, { status: 'Failed' });

    return false; // Email delivery failed
  }
};

module.exports = {
  sendScheduledEmail,
};
