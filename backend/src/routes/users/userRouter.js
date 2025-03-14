const express = require("express");
const { SignIn } = require("../../controllers/users/signin");
const { Signup } = require("../../controllers/users/signup");
const { getProfile } = require("../../controllers/users/getProfile");
const { userVerification } = require("../../../middlewares/AuthMiddleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User router called");
});

router.post("/signin", SignIn);
router.post("/signup", Signup);
router.get("/profile", userVerification, getProfile);

module.exports = router;
