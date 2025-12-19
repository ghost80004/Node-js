const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    releaseYear: { type: Number, required: true },
    thumbnail: { type: String, required: true }, // image URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
