const express = require("express");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/upload");

const {
  createMovie,
  updateMovie,
  deleteMovie,
  getAllMovies
} = require("../controllers/movieController");

const router = express.Router();

router.post(
  "/create",
  isAuth,
  isAdmin,
  upload.single("poster"),
  createMovie
);

router.put("/:id", isAuth, isAdmin, updateMovie);
router.delete("/:id", isAuth, isAdmin, deleteMovie);
router.get("/", getAllMovies);

module.exports = router;
