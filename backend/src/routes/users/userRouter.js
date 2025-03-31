const express = require("express");
const { SignIn } = require("../../controllers/users/signin");
const { Signup } = require("../../controllers/users/signup");
const { getProfile } = require("../../controllers/users/getProfile");
const { userVerification } = require("../../../middlewares/AuthMiddleware");
const { getCars } = require("../../controllers/users/getCars");
const { addCar } = require("../../controllers/users/addCar");
const {
  getCarByDealerId,
} = require("../../controllers/users/getCarByDealerId");
const { getCarById } = require("../../controllers/users/getCarById");
const { getMe } = require("../../controllers/users/getMe");
const { updateCar } = require("../../controllers/users/updateCar");
const { deleteCarById } = require("../../controllers/users/deleteCarById");
const { updateProfile } = require("../../controllers/users/updateProfile");
const router = express.Router();

router.get("/", (req, res) => {
  const data = userVerification();
  res.send("User router called");
});

router.get("/me", getMe);

router.post("/signin", SignIn);
router.post("/signup", Signup);
router.get("/profile", getProfile);
router.patch('/profile/:id',updateProfile)
router.get("/cars", getCars);
router.post("/car", userVerification, addCar);
router.patch("/car/:id", updateCar);
router.get("/cars/me", userVerification, async (req, res) => {
  const dealerId = req.user._id;
  const cars = await getCarByDealerId(dealerId);
  res.send(cars);
});

router.delete("/car/:id", deleteCarById);

router.get("/car/:id", getCarById);

module.exports = router;
