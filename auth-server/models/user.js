const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  hash: String,
  profileUrl: String,
});

module.exports = mongoose.model("User", userSchema);
