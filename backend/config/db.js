const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(db);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
