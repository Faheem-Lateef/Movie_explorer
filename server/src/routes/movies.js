// server/src/routes/movies.js
const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => res.json({ msg: 'movies route OK' }));

module.exports = router;
