import mongoose from "mongoose";
import "dotenv/config";
import e from "express";

const MONGO_URI_LOCAL = process.env.MONGO_URI_LOCAL;

export const connectToDb = async () => {
  try {
    await mongoose.connect(MONGO_URI_LOCAL);
  } catch (error) {
    console.log(error);
  }

  console.log("Connected successfully to MongoDB!");
};
