const express = require("express")
const { forgotPassword } = require("../controllers/UserController")

const router = express.Router()

router.post("/generateOTP",forgotPassword)

module.exports = router