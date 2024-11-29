import mongoose from "mongoose";

const connectDD = async (mongoDBUrl: string) => {
  try {
    await mongoose.connect(mongoDBUrl);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to database: ", err);
  }
};

export default connectDD;
