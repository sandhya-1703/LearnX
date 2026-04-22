// server/models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  courses: [
    {
      title: String,
      progress: {
        type: Number,
        default: 0
      }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);