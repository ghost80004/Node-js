const Movie = require("../models/movieModel");

// CREATE
exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      thumbnail: req.file.path,
    });
    res.status(201).json({ success: true, movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({ success: true, movies });
};

// READ ONE
exports.getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.status(200).json({ success: true, movie });
};

// UPDATE
exports.updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.status(200).json({ success: true, movie });
};

// DELETE
exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.status(200).json({ success: true, message: "Movie deleted" });
};
