module.exports.getProfile = async (req, res) => {
  try {
    res.send({ profile: { name: "ashish" } });
  } catch (error) {
    res.send({ error });
  }
};
