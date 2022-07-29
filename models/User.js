const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
