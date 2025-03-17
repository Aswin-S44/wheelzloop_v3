const Cars = require("../../../models/users/carSchema");

module.exports.getCars = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "created_at",
      order = "desc",
      search,
      make,
      model,
      year,
      priceMin,
      priceMax,
      fuel_type,
      transmission,
      body_type,
      status,
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let filter = {};
    if (search)
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    if (make) filter.make = make;
    if (model) filter.model = model;
    if (year) filter.year = parseInt(year);
    if (priceMin || priceMax)
      filter.price = {
        ...(priceMin && { $gte: parseInt(priceMin) }),
        ...(priceMax && { $lte: parseInt(priceMax) }),
      };
    if (fuel_type) filter.fuel_type = fuel_type;
    if (transmission) filter.transmission = transmission;
    if (body_type) filter.body_type = body_type;
    if (status) filter.status = status;

    const cars = await Cars.find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limitNum);

    const totalCars = await Cars.countDocuments(filter);

    res.json({
      success: true,
      data: cars,
      pagination: {
        total: totalCars,
        page: pageNum,
        pages: Math.ceil(totalCars / limitNum),
        limit: limitNum,
      },
    });
  } catch (error) {
    console.log("Error while fetching cars:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
