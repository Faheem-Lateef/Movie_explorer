// server/src/routes/favorites.js
const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => res.json({ msg: 'favorites route OK' }));

module.exports = router;
