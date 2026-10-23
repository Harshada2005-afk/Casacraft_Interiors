/**
 * Wraps an async route handler so any thrown error reaches the error middleware.
 * (Express 5 already does this, but the wrapper keeps controllers explicit and
 * works the same if the project is ever moved to Express 4.)
 */
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
