const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid.");
    }

    const decodedObj = await jwt.verify(token, "Dots#123?");

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).send("Something went wrong." + error.message);
  }
};

module.exports = { userAuth };
