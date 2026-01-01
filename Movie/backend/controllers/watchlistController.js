const Watchlist = require("../model/watchlistModel");

// ADD
exports.addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    if (!movieId)
      return res.status(400).json({ message: "Movie ID required" });

    const item = await Watchlist.create({
      userId: req.user.id,
      movieId
    });

    res.status(201).json({ message: "Added to watchlist", item });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET USER WATCHLIST
exports.getWatchlist = async (req, res) => {
  try {
    const list = await Watchlist.find({ userId: req.user.id });
    res.status(200).json({ success: true, list });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// REMOVE
exports.removeFromWatchlist = async (req, res) => {
  try {
    const item = await Watchlist.findByIdAndDelete(req.params.id);
    if (!item)
      return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
