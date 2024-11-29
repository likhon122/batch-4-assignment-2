import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const mongodbUrl =
  process.env.MONGODB_URL || "mongodb://localhost:27017/assignment-2";

export { port, mongodbUrl };
