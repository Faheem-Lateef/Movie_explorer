// server/src/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/me  (protected)
router.get('/me', authMiddleware, authController.me);

// simple ping for quick check
router.get('/ping', (req, res) => res.json({ msg: 'auth route OK' }));

module.exports = router;
