// server/src/controllers/favoriteController.js
const Favorite = require('../models/Favorite');

// Add a movie to favorites
exports.addFavorite = async (req, res, next) => {
  try {
    const { movieId, title, poster, year } = req.body;
    if (!movieId || !title) {
      return res.status(400).json({ error: 'movieId and title are required' });
    }

    const favorite = new Favorite({
      userId: req.user.id,
      movieId,
      title,
      poster,
      year,
    });

    await favorite.save();
    return res.status(201).json({ message: 'Added to favorites', favorite });
  } catch (err) {
    next(err);
  }
};

// Get all favorites for logged-in user
exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    return res.json({ favorites });
  } catch (err) {
    next(err);
  }
};

// Remove favorite by ID
exports.removeFavorite = async (req, res, next) => {
  try {
    const favId = req.params.id;
    const favorite = await Favorite.findOneAndDelete({ _id: favId, userId: req.user.id });
    if (!favorite) return res.status(404).json({ error: 'Favorite not found' });

    return res.json({ message: 'Removed from favorites' });
  } catch (err) {
    next(err);
  }
};
