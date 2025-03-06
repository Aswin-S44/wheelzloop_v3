const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User router called");
});

module.exports = router;
