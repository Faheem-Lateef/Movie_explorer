// server/src/index.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.get('/', (req, res) => {
  res.send('API is running here in 5000 🚀');
});

// basic health route
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// mount route placeholders (created below)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/favorites', require('./routes/favorites'));

// error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
