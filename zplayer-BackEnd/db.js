const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://localhost:27017/Z-player";


const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
};

connectDB()