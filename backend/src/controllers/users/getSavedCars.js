const Cars = require("../../../models/users/carSchema");

module.exports.getSavedCars = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "createdAt" } = req.query;
    const ids = req.body.savedIds;
    console.log("IDS------------", ids);
    const cars = await Cars.find({ _id: { $in: ids } })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalCars = await Cars.countDocuments({ _id: { $in: ids } });
    res.send({ cars, total: totalCars });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
