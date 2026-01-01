const Movie = require("../models/Movie");

// CREATE MOVIE (ADMIN)
exports.createMovie = async (req, res) => {
  const { title, description, genre } = req.body;

  const movie = await Movie.create({
    title: title,
    description: description,
    genre: genre,
    poster: req.file ? req.file.path : null,
    createdBy: req.user._id
  });

  res.status(201).json({ success: true, movie });
};

// READ ALL
exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.json({ success: true, movies });
};

// UPDATE
exports.updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json({ success: true, movie });
};

// DELETE
exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json({ message: "Movie deleted" });
};
