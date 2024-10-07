import { config } from "dotenv";
config();

const envConfig = {
  port: process.env.PORT,
  mongoConnectionString : process.env.MONGO_URI
};

export default envConfig;