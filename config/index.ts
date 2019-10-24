import dotenv from "dotenv";

dotenv.config();

export default {
  DATABASE_URL: process.env.DATABASE_URL || "",
  PORT: process.env.PORT || "",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || ""
};
