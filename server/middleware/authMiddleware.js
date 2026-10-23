const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { verifyToken } = require('../services/tokenService');

/** Reads "Authorization: Bearer <token>" from the request. */
function getToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : null;
}

/** Loads the user for a token, or throws 401. */
async function userFromToken(token) {
  let payload;
  try {
    payload = verifyToken(token);
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Your session has expired. Please log in again.' : 'Invalid token. Please log in again.';
    throw new ApiError(401, message);
  }
  const user = await User.findById(payload.sub);
  if (!user) throw new ApiError(401, 'The account for this token no longer exists.');
  return user;
}

/**
 * authMiddleware – requires a valid login token.
 * Attaches the logged-in user as req.user.
 */
async function authMiddleware(req, _res, next) {
  const token = getToken(req);
  if (!token) return next(new ApiError(401, 'Please log in to access this resource.'));
  try {
    req.user = await userFromToken(token);
    return next();
  } catch (err) {
    return next(err);
  }
}

/**
 * optionalAuth – attaches req.user when a valid token is sent,
 * but lets guests through (used for public forms such as consultations).
 */
async function optionalAuth(req, _res, next) {
  const token = getToken(req);
  if (!token) return next();
  try {
    req.user = await userFromToken(token);
  } catch {
    // An invalid token on a public route is ignored – the request continues as a guest.
  }
  return next();
}

module.exports = { authMiddleware, optionalAuth };
