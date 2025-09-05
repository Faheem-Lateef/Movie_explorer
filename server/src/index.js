// server/src/index.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Explorer API',
      version: '1.0.0',
      description: 'API documentation for the Movie Explorer application',
      contact: {
        name: 'API Support',
        url: 'http://localhost:5000',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

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

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
