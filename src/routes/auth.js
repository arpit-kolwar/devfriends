const express = require("express");
const { validateSignUp } = require("../utils/validateSignUp");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(500).json({
      message: "Error saving user",
      error: error.message,
    });
    console.log(error);
  }
  //Create an instance of User model
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    console.log(user);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPassWordValid = await user.validatePassword(password);

    if (isPassWordValid) {
      const token = await user.getJWT();

      res.cookie("token", token);

      res.status(200).send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    res.send("Logout successfull");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = authRouter;
