const rateLimit = require('express-rate-limit');
const { env } = require('../config/env');

const json = (message) => ({ success: false, message });

/** General limit for the whole API. */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: json('Too many requests. Please try again in a few minutes.'),
  skip: () => env.isTest,
});

/** Stricter limit for login/registration to slow down password guessing. */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: json('Too many login attempts. Please try again in 15 minutes.'),
  skip: () => env.isTest,
});

/** Limit for public forms (contact, consultation) to stop spam. */
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: json('Too many submissions. Please try again later.'),
  skip: () => env.isTest,
});

module.exports = { apiLimiter, authLimiter, formLimiter };
