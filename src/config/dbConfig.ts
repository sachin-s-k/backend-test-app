import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDb = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI as string;

    await mongoose.connect(mongoUri);
    console.log("Successfully connected to mongodb database");
  } catch (error) {
    process.exit(1);
  }
};

export default connectDb;
