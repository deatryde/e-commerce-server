require("dotenv").config();

module.exports = {
  mongoURL: process.env.DB_PROD,
  jwtSecret: process.env.JWT_SECRET,
};
