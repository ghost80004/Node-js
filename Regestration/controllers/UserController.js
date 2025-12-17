const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const {generateToken} = require("../utils/GenrateToken")

const OTP = require("../model/otpModel");
const sendOTP = require("../utils/sendOtp");
// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email,avatar:req.file.path, password: hash });

    res.status(200).json({ message: "Registration Successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email & Password required" });

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(400).json({ message: "Invalid password" });
 const token = generateToken(user.id, res);

  res.status(200).json({ message: "Login success", user , token});

};

// Get All
exports.getAll = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
};

// Get One
exports.getOne = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.status(200).json({ success: true, user });
};

// Update
exports.update = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true }
  );

  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.status(200).json({ message: "Updated Successfully", user });
};

// Delete
exports.remove = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.status(200).json({ message: "Deleted Successfully", user });
};

// Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email & Password required" });

  const user = await User.findOne({ email, isAdmin: true }).select("+password");

  if (!user)
    return res.status(400).json({ message: "Admin user not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(400).json({ message: "Invalid password" });

  const token = generateToken(user.id, res);

  res.status(200).json({ message: "Login success", user , token});
};
// Forgate password



exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // OTP generate
        const OTPcode = Math.floor(100000 + Math.random() * 900000).toString();

        // Update / Create OTP
        await OTP.findOneAndUpdate(
            { email },
            {
                email,
                otp: OTPcode,
                expireAt: Date.now() + 10 * 60 * 1000, // 10 min
            },
            { upsert: true, new: true }
        );

        console.log("OTP:", OTPcode);

        // Email send
        await sendOTP({
            email,
            subject: "OTP for password reset",
            message: `Your OTP is ${OTPcode}`,
        });

        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending OTP", error });
    }
};
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    if (!email || !otp || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const checkOTP = await OTP.findOne({ email }).select("+otp");
    if (!checkOTP) {
      return res.status(400).json({ message: "OTP not found" });
    }

    // Check expiry first
    if (checkOTP.expireAt < Date.now()) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    // Match OTP
    if (checkOTP.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    await OTP.deleteOne({ email });

    res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({
      message: "Error while verifying OTP",
      error: error.message
    });
  }
};
