const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {  
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isComplete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = todoModel = mongoose.model("Todo", todoSchema);
