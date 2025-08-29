// server/src/controllers/movieController.js
const omdbService = require('../services/omdbService');

// Search movies
exports.search = async (req, res, next) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: 'Query is required' });

    const data = await omdbService.searchMovies(q);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

// Get details by ID
exports.details = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    if (!movieId) return res.status(400).json({ error: 'Movie ID required' });

    const data = await omdbService.getMovieDetails(movieId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};
