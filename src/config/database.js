const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = { connectToDatabase };
