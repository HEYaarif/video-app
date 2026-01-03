import mongoose from "mongoose";

let isConnected = false;

export async function connectToDataBase() {
  if (isConnected) return;

  const MONGODB_URI = process.env.mongo_uri;

  if (!MONGODB_URI) {
    console.warn("mongo_uri is not defined. Skipping DB connection.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
}
