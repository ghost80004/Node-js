exports.isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User Not Authorized" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: "Admin Error", error: err });
  }
};
