// server/src/routes/favorites.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const favoriteController = require('../controllers/favoriteController');

// All routes are protected
router.post('/', auth, favoriteController.addFavorite);
router.get('/', auth, favoriteController.getFavorites);
router.delete('/:id', auth, favoriteController.removeFavorite);

module.exports = router;
