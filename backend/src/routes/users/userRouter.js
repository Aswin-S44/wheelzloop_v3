const express = require("express");
const { SignIn } = require("../../controllers/users/signin");
const { Signup } = require("../../controllers/users/signup");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User router called");
});

router.post("/signin", SignIn);
router.post("/signup", Signup);

module.exports = router;
