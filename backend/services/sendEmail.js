const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email_User,
      pass: process.env.Email_Pass,
    },
  });
  const mailOptions = {
    from: "Asmit Khanal <asmitkhanal335@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
