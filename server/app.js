/**
 * Builds the Express app (without starting it), so tests can import it.
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { env } = require('./config/env');
const routes = require('./routes');
const { apiLimiter } = require('./middleware/rateLimiters');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Trust the first proxy (Render, Railway, Heroku…) so rate limiting sees real client IPs
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// CORS: only the frontend address(es) in CLIENT_URL may call the API from a browser
const allowedOrigins = env.CLIENT_URL.split(',').map((url) => url.trim().replace(/\/$/, ''));
app.use(
  cors({
    origin(origin, callback) {
      // Allow tools without an Origin header (curl, Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Body parsing with a size limit
app.use(express.json({ limit: '100kb' }));

// Request logging (skipped in tests)
if (!env.isTest) app.use(morgan(env.isProduction ? 'combined' : 'dev'));

app.use('/api', apiLimiter, routes);

app.get('/', (_req, res) => res.json({ success: true, message: 'CasaCraft Interiors API. See /api/health', data: null }));

// 404 + centralised error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
