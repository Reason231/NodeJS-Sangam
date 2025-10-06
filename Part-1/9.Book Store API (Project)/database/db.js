const mongoose = require("mongoose");
const db_url = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("MongoDB successfully connected");
  } catch (e) {
    console.error("MongoDB connection failed", e);
    process.exit(1);
  }
};

module.exports = connectDB;
