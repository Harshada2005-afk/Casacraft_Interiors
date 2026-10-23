const ApiError = require('../utils/ApiError');

/**
 * adminMiddleware – only lets admins through.
 * Always use it AFTER authMiddleware:  router.post('/', authMiddleware, adminMiddleware, handler)
 */
module.exports = function adminMiddleware(req, _res, next) {
  if (!req.user) return next(new ApiError(401, 'Please log in to access this resource.'));
  if (req.user.role !== 'admin') return next(new ApiError(403, 'You do not have permission to perform this action.'));
  return next();
};
