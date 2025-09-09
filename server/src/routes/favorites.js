/**
 * Favorites Routes
 * 
 * This file handles all routes related to user's favorite movies functionality.
 * It provides endpoints for adding, retrieving, and removing movies from a user's favorites list.
 * All routes are protected and require authentication.
 * 
 * @module routes/favorites
 */

// server/src/routes/favorites.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const favoriteController = require('../controllers/favoriteController');

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: User's favorite movies management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - userId
 *         - movieId
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the favorite
 *         userId:
 *           type: string
 *           description: The ID of the user who favorited the movie
 *         movieId:
 *           type: string
 *           description: The IMDB ID of the favorited movie
 *         title:
 *           type: string
 *           description: The title of the favorited movie
 *         poster:
 *           type: string
 *           format: url
 *           description: URL to the movie poster
 *         year:
 *           type: string
 *           description: The release year of the movie
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the movie was favorited
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add a movie to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - title
 *             properties:
 *               movieId:
 *                 type: string
 *                 description: The IMDB ID of the movie
 *               title:
 *                 type: string
 *                 description: The title of the movie
 *               poster:
 *                 type: string
 *                 format: url
 *                 description: URL to the movie poster
 *               year:
 *                 type: string
 *                 description: The release year of the movie
 *     responses:
 *       201:
 *         description: Movie added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Invalid input or already in favorites
 *       401:
 *         description: Not authenticated
 */
router.post('/', auth, favoriteController.addFavorite);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get user's favorite movies
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's favorite movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       401:
 *         description: Not authenticated
 */
router.get('/', auth, favoriteController.getFavorites);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     summary: Remove a movie from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The favorite ID to remove
 *     responses:
 *       200:
 *         description: Movie removed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Favorite removed'
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Favorite not found
 */
router.delete('/:id', auth, favoriteController.removeFavorite);

module.exports = router;
