const mongoose = require("mongoose");
const UserScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserScheme);

module.exports = User;
