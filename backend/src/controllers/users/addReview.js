const Review = require("../../../models/users/reviewSchema");

module.exports.addReview = async (req, res) => {
  try {
    const { userId, rating, reviewText } = req.body;

    if (!userId || !rating || !reviewText) {
      res.send({ message: "All fields required" });
    }
    const resp = await Review.create(req.body);
    console.log("resp--------------", resp ? resp : "no resp");
    res.status(200).send({ message: "Rating added" });
  } catch (error) {
    console.log("Error while adding review : ", error);
    return error;
  }
};
