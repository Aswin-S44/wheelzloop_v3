require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users/userSchema");
module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        // Attach user data to req object
        req.user = user;
        req.userId = user._id;
        next(); // Proceed to the next middleware or route handler
      } else {
        return res.json({ status: false });
      }
    }
  });
};
