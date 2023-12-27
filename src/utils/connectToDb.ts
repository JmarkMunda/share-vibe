import mongoose from "mongoose";

let isConnected = false;

const connectToDb = async () => {
  try {
    mongoose.set("strictQuery", true);

    if (isConnected) {
      console.log("Mongodb is already connected.");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI!, {});
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("Error connecting to db:", error);
  }
};

export default connectToDb;
