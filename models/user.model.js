const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }, 
    todos: [{
      type: mongoose.Schema.ObjectId,
      ref: "Todo"
    }]
  },
  { timestamps: true }
);

module.exports = userModel = mongoose.model("User", userSchema);
