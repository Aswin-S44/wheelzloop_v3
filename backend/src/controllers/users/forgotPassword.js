const User = require("../../../models/users/userSchema");
const crypto = require("crypto");
const { sendEmail } = require("../../utils/utils");
const { emailSubjects } = require("../../../constants/templates");

const applicationUrl = process.env.APPLICATION_URL || "http://localhost:3000";

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).send({ message: "User not found" });
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 10;
  await user.save();

  const resetPasswordLink = `${applicationUrl}/reset-password/${resetToken}`;

  let htmlContent = `<p>You requested to reset your password. Click <a href=${resetPasswordLink}>here</a> to reset.</p>`;
  await sendEmail(
    emailSubjects.PASSWORD_RESET,
    emailSubjects.PASSWORD_RESET,
    htmlContent,
    email
  );
  res.status(200).json({ message: "Password reset link sent to your email." });
};
