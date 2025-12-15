const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  otp: {
    type: String,
    required: [true, "OTP is required"],
    select: false
  },
  expireAt: {
    type: Date,
  },

}, { timestamps: true });

module.exports = mongoose.model("OTP", otpSchema);
