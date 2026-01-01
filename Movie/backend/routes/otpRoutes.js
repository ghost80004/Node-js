const express = require("express");
const {
  forgotPassword,
  verifyOTP,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/generateOTP", forgotPassword);
router.post("/verify", verifyOTP);

module.exports = router;
