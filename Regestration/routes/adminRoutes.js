const express = require("express");
const {adminLogin} = require("../controllers/UserController")
const {isAdmin} = require("../middleware/isAdmin")
const {isAuth} = require("../middleware/isAuth")
const {

  getOne

} = require("../controllers/UserController");
const router = express.Router();

router.post("/login",adminLogin);
router.get("/get/:id",isAuth,isAdmin, getOne);

module.exports = router;