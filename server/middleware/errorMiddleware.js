const ApiError = require('../utils/ApiError');
const { env } = require('../config/env');

/** 404 for unknown routes. */
function notFound(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

/**
 * Centralised error handler. Every error ends up here and is returned as:
 *   { success: false, message, errors? }
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errors = err.errors && err.isOperational ? err.errors : undefined;

  // Invalid MongoDB id, e.g. /api/consultations/123
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for ${err.path}`;
  }

  // Mongoose schema validation failed
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
    message = errors[0]?.message || 'Validation failed';
  }

  // Duplicate unique field (e.g. email already registered)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = field === 'email' ? 'An account with this email already exists' : `A record with this ${field} already exists`;
  }

  // Malformed JSON body
  if (err.type === 'entity.parse.failed') {
    statusCode = 400;
    message = 'Request body must be valid JSON';
  }

  if (statusCode >= 500) {
    console.error(err);
    // Never leak internal details (stack traces, DB messages) in production
    if (env.isProduction) message = 'Something went wrong. Please try again later.';
  }

  const body = { success: false, message };
  if (errors) body.errors = errors;
  if (!env.isProduction && statusCode >= 500) body.stack = err.stack;

  res.status(statusCode).json(body);
}

module.exports = { notFound, errorHandler };
