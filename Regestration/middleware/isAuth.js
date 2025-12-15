const dotenv = require("dotenv")
dotenv.config()
exports.isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "User Is Not Authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    next(); // VERY IMPORTANT
  } catch (err) {
    return res.status(500).json({ message: "Authentication Error" });
  }
};
