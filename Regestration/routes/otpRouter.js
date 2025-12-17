const express = require("express")
const { forgotPassword } = require("../controllers/UserController")
const { verifyOTP } = require("../controllers/UserController")
const {isAuth} = require("../middleware/isAuth")
const router = express.Router()

router.post("/generateOTP",forgotPassword)
router.post("/verify",verifyOTP)
module.exports = router