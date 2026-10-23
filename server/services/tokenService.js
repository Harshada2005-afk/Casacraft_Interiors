const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

/** Creates a signed login token that stores only the user id and role. */
function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
    algorithm: 'HS256',
  });
}

/** Verifies a token and returns its payload (throws if invalid or expired). */
function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] });
}

module.exports = { signToken, verifyToken };
