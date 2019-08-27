import config from "config";
import mongoose from "mongoose";

const mongoConnectionString = config.get("mongoConnectionString");

const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoConnectionString, {useNewUrlParser: true});
    console.log("MongoDB connected.")
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
};

export default connectDatabase
