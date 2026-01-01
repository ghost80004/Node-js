const jwt = require("jsonwebtoken");

const generateToken = (id, res) => {
  const token = jwt.sign(
    { id: id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });
};

module.exports = generateToken;
