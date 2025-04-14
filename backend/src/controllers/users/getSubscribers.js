const NewsLetter = require("../../../models/users/newLetterSubscription");

module.exports.getSubscribers = async (req, res) => {
  try {
    const subs = await NewsLetter.find();
    res.send(subs);
  } catch (error) {
    console.log("Error while fetching subscribers : ", error);
    return error;
  }
};
