const OTP = require("../models/OTP");
const User = require("../models/User");
const sendOTP = require("../utils/sendOTP");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs"); // safer than crypto

// Generate OTP
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.deleteOne({ email });

    await OTP.create({ email, otp, expireAt: Date.now() + 5*60*1000 });

    await sendOTP({
      email,
      subject: "Your OTP Code",
      message: `Your OTP is ${otp}. Valid for 5 minutes.`,
    });

    res.status(200).json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Verify OTP and login
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp, name } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "All fields required" });

    const otpData = await OTP.findOne({ email }).select("+otp");
    if (!otpData) return res.status(400).json({ message: "OTP expired" });
    if (otpData.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    let user = await User.findOne({ email });
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        name: name || "User",
        email,
        password: hashedPassword,
      });
    }

    generateToken(user._id, res);
    await OTP.deleteOne({ email });

    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
