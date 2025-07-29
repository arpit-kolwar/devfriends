const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", userAuth, async (req, res) => {
  try {
    const cookie = req.cookies;

    const { token } = cookie;

    const payload = await jwt.verify(token, "Dots#123?");

    const userDetails = await User.findById(payload._id);

    res.json({
      message: "token",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
