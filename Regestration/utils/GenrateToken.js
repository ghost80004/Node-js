const jwt = require("jsonwebtoken");

exports.generateToken = (userId, res) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",

    // ✅ MUST be Date object
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return token;
};
