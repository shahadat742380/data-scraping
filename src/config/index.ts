import "dotenv/config";

export default {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
};
