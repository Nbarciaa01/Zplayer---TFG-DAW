const mongoose = require("mongoose");
const MONGODB_URI = "mongodb+srv://aloposo54:0LWja0wBX6PqSrKF@zplayer.rhb964m.mongodb.net/Z-player";


const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
};

connectDB()