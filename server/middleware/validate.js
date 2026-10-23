const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * Runs after express-validator rules. If any rule failed, responds with 400
 * and a list of field errors:  { field: 'email', message: 'Please provide a valid email' }
 */
module.exports = function validate(req, _res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = result.array({ onlyFirstError: true }).map((e) => ({ field: e.path, message: e.msg }));
  return next(new ApiError(400, errors[0].message, errors));
};
