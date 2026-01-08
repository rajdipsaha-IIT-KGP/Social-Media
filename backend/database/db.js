const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "SocialMedia",
    });
    console.log("Connected to Database");
  } catch (err) {
    console.log("Error while connecting to DB", err);
  }
};

module.exports = { connectDB };
