const Cars = require("../../../models/users/carSchema");
const User = require("../../../models/users/userSchema");

module.exports.getStatusCount = async (req, res) => {
  try {
    console.log("get stat count api called");
    const [carsCount, usersCount, brandsCount] = await Promise.all([
      Cars.countDocuments(),
      User.countDocuments(),
      Cars.distinct("brand").countDocuments(),
    ]);

    let respObj = {
      cars: carsCount,
      customers: usersCount,
      brands: brandsCount,
    };
    res.send(respObj);
  } catch (error) {
    console.log("Error while fetching stat counts : ", error);
    return error;
  }
};
