const express = require("express");
const isAuth = require("../middleware/isAuth");
const {
  addReview,
  getMovieReviews
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/add", isAuth, addReview);
router.get("/:movieId", getMovieReviews);

module.exports = router;
