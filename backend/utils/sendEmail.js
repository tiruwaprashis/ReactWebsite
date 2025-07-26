const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // Define email options
  const mailOptions = {
    from: `Academic Records <${process.env.FROM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;