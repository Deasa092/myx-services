const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connect to Database: ${mongoose.connection.host}`.bgGreen
    );
  } catch (error) {
    console.log("Error DB", error .bgRed);
  }
};

module.exports = connectDb