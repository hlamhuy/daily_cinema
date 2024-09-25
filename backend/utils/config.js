require('dotenv').config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.BACKEND_PORT,
  MOVIES_PATH: process.env.MOVIES_PATH,
  OUTPUT_PATH: process.env.OUTPUT_PATH,
};
