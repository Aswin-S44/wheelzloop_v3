const Cars = require("../../../models/users/carSchema");

module.exports.deleteCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Cars.findById(carId);
    if (!car) {
      res.status(200).send({ message: "Car not Found!" });
    }

    await Cars.deleteOne({ _id: carId });
    res.json({ success: true });
  } catch (error) {
    console.log("Error while deleting car : ", error);
    return error;
  }
};
