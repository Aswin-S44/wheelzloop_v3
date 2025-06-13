const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../../utils/utils");
const User = require("../../../models/users/userSchema");

module.exports.SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Enable in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      domain:
        process.env.NODE_ENV === "production"
          ? "https://wheelzloop-v3-1.onrender.com"
          : undefined,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, user });
    next();
  } catch (error) {
    return error;
  }
};
