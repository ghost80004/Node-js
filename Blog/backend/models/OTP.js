const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true, select: false },
    expireAt: { type: Date, expires: 300 }, // 5 minutes auto-delete
  },
  { timestamps: true }
);

module.exports = mongoose.model("OTP", otpSchema);
