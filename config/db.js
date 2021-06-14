const mongoose = require("mongoose");
const config = require("./keys");
const db = config.mongoURL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to database");
  } catch (err) {
    console.log("Connection Failed");
    process.exit();
  }
};

module.exports = connectDB;
