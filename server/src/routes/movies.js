// server/src/routes/movies.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie search and details
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MovieSearchResult:
 *       type: object
 *       properties:
 *         imdbID:
 *           type: string
 *           description: The IMDB ID of the movie
 *         Title:
 *           type: string
 *           description: The title of the movie
 *         Year:
 *           type: string
 *           description: The release year of the movie
 *         Type:
 *           type: string
 *           description: The type of the result (movie, series, episode)
 *         Poster:
 *           type: string
 *           format: url
 *           description: URL to the movie poster
 *     MovieDetails:
 *       type: object
 *       properties:
 *         imdbID:
 *           type: string
 *           description: The IMDB ID of the movie
 *         Title:
 *           type: string
 *           description: The title of the movie
 *         Year:
 *           type: string
 *           description: The release year of the movie
 *         Rated:
 *           type: string
 *           description: The movie's rating (e.g., PG-13, R)
 *         Released:
 *           type: string
 *           description: The release date
 *         Runtime:
 *           type: string
 *           description: The duration of the movie
 *         Genre:
 *           type: string
 *           description: Genres of the movie
 *         Director:
 *           type: string
 *           description: The director(s) of the movie
 *         Writer:
 *           type: string
 *           description: The writer(s) of the movie
 *         Actors:
 *           type: string
 *           description: The main actors in the movie
 *         Plot:
 *           type: string
 *           description: A short plot summary
 *         Language:
 *           type: string
 *           description: The language of the movie
 *         Country:
 *           type: string
 *           description: The country of origin
 *         Poster:
 *           type: string
 *           format: url
 *           description: URL to the movie poster
 *         Ratings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               Source:
 *                 type: string
 *               Value:
 *                 type: string
 *         imdbRating:
 *           type: string
 *           description: The IMDB rating
 *         imdbVotes:
 *           type: string
 *           description: The number of IMDB votes
 */

/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     summary: Search for movies by title
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie title to search for
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: A list of movies matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Search:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MovieSearchResult'
 *                 totalResults:
 *                   type: string
 *                   description: Total number of results
 *                 Response:
 *                   type: string
 *                   description: Response status ("True" or "False")
 *       400:
 *         description: Invalid search query
 *       404:
 *         description: No movies found
 *       500:
 *         description: Server error
 */
router.get('/search', movieController.search);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get detailed information about a specific movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: IMDB ID of the movie
 *     responses:
 *       200:
 *         description: Detailed information about the movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovieDetails'
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 */
router.get('/:id', movieController.details);

module.exports = router;
