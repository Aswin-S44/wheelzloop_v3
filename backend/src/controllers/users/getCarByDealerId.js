const Cars = require("../../../models/users/carSchema");

module.exports.getCarByDealerId = async (dealerId) => {
  try {
    const cars = await Cars.find({ dealer_id: dealerId });

    return cars;
  } catch (error) {
    console.log("Error while fetching car : ", error);
    return error;
  }
};
