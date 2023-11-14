import React, { useState } from 'react';

function ScheduleEmail() {
  const [emailData, setEmailData] = useState({
    recipientEmail: '',
    subject: '',
    body: '',
    scheduledTime: '',
  });

  const handleChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email scheduling logic (e.g., send data to the server to schedule the email)
    console.log('Scheduled Email Data:', emailData);
  };

  return (
    <div className="schedule-email-container">
      <h2>Schedule Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="recipientEmail"
          placeholder="Recipient Email"
          value={emailData.recipientEmail}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={emailData.subject}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="Email Body"
          value={emailData.body}
          onChange={handleChange}
        ></textarea>
        <input
          type="datetime-local"
          name="scheduledTime"
          value={emailData.scheduledTime}
          onChange={handleChange}
        />
        <button type="submit">Schedule Email</button>
      </form>
    </div>
  );
}

export default ScheduleEmail;
