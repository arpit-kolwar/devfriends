const express = require("express");
require("dotenv").config();
const { connectToDatabase } = require("./config/database");
const User = require("./models/user");
const { validateSignUp } = require("./utils/validateSignUp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRouter = require("./routes/request");

app.use("/auth", authRouter);
app.use("/user", profileRouter);
app.use("/connection", connectionRouter);

connectToDatabase()
  .then(() => {
    console.log("Connected to the database successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });
