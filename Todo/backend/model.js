
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: [true, "Please Enter Todo"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todos", todoSchema);
