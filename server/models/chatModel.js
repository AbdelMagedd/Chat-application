const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    members: Array,
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", userSchema);

module.exports = Chat;
