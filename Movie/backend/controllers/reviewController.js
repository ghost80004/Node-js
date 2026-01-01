const Review = require("../models/Review");

// ADD REVIEW (USER)
exports.addReview = async (req, res) => {
  try {
    const movieId = req.body.movieId;
    const rating = req.body.rating;
    const comment = req.body.comment;

    if (!movieId || !rating || !comment) {
      return res.status(400).json({ message: "All fields required" });
    }

    const review = await Review.create({
      movieId: movieId,
      userId: req.user._id,
      rating: rating,
      comment: comment
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET REVIEWS OF MOVIE
exports.getMovieReviews = async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const reviews = await Review.find({ movieId: movieId })
      .populate("userId", "name");

    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
