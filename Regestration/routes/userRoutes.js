const express = require("express");
const {isAuth} = require("../middleware/isAuth")

const upload = require("../middleware/userCloudnory")
const {
  register,
  login,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/userController");

const router = express.Router();

// Routes
router.post("/register",upload.single("avatar"), register);
router.post("/login", login);
router.get("/all", getAll);
router.get("/:id",isAuth, getOne);
router.put("/:id",isAuth, update);
router.delete("/:id",isAuth, remove);




module.exports = router;
