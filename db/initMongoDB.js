import mongoose from "mongoose";

import { getEnvVar } from "../helpers/getEnvVar.js";

const initMongoDB = async () => {
  try {
    console.log("Database connection successful");
    const user = getEnvVar("MONGODB_USER");
    const pwd = getEnvVar("MONGODB_PASSWORD");
    const url = getEnvVar("MONGODB_URL");
    const db = getEnvVar("MONGODB_DB");

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?appName=Cluster0`,
    );
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default initMongoDB;
