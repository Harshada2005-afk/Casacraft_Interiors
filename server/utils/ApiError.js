/**
 * An error with an HTTP status code.
 * Throw it anywhere in a controller and the error middleware turns it
 * into a clean JSON response.
 *
 *   throw new ApiError(404, 'Project not found');
 */
class ApiError extends Error {
  constructor(statusCode, message, errors) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
  }
}

module.exports = ApiError;
