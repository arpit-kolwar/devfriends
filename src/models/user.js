const mongoose = require("mongoose");
const validator = require("validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      },
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "This is default value",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
    },
    "Dots#123?",
    {
      expiresIn: "7d",
    }
  );

  return token;
};

userSchema.methods.validatePassword = async function (inputPass) {
  const user = this;

  const isPassWordValid = await bcrypt.compare(inputPass, user.password);

  return isPassWordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
