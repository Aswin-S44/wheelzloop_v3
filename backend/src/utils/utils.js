require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const wheelzLoopEmail = process.env.EMAIL_USER;
const crypto = require("crypto");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "something secret");
  } catch (error) {
    return null;
  }
};

module.exports.sendEmail = async (
  from,
  subject,
  content,
  htmlContent = null,
  to
) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("from-----------", from);
    console.log("to----------", to);
    var mailOptions = {
      from,
      to,
      subject,
      text: content,
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("Error while sending email : ", error);
    return error;
  }
};

module.exports.generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};
