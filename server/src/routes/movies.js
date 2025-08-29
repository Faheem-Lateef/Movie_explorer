// server/src/routes/movies.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// GET /api/movies/search?q=Batman
router.get('/search', movieController.search);

// GET /api/movies/:id
router.get('/:id', movieController.details);

module.exports = router;
