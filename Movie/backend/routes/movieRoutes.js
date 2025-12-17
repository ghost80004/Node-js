const express = require("express");
const upload = require("../middleware/uploadThumbnail");
const {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.post("/create", upload.single("thumbnail"), createMovie);
router.get("/", getMovies);
router.get("/:id", getMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
