const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const sendOTP = require("../utils/sendOTP");

// ================= SEND OTP (FORGOT PASSWORD) =================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // check email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // remove old otp
    await OTP.findOneAndDelete({ email });

    // save otp
    await OTP.create({
      email,
      otp,
      expireAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    });

    // send otp mail
    await sendOTP({
      email,
      subject: "Forgot Password OTP",
      message: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to registered email",
    });
  } catch (error) {
    res.status(500).json({ message: "OTP sending failed" });
  }
};

// ================= VERIFY OTP + RESET PASSWORD =================
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const otpData = await OTP.findOne({ email }).select("+otp");

    if (!otpData) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (otpData.expireAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password
    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    // delete otp after success
    await OTP.findOneAndDelete({ email });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({ message: "OTP verification failed" });
  }
};
