const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const pick = require('../utils/pick');
const { sendSuccess } = require('../utils/apiResponse');
const { paginatedQuery } = require('../services/queryService');

/** GET /api/users – admin: list users (?search= ?role=customer ?page=). */
exports.getAll = asyncHandler(async (req, res) => {
  const { items, pagination } = await paginatedQuery(User, req.query, {
    searchFields: ['name', 'email', 'phone'],
    filterFields: ['role'],
    sortFields: ['createdAt', 'name', 'email', 'role'],
    defaultSort: '-createdAt',
  });
  return sendSuccess(res, { message: 'Users loaded', data: items, pagination });
});

/** GET /api/users/:id – admin. */
exports.getOne = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  return sendSuccess(res, { message: 'User loaded', data: user });
});

/** PUT /api/users/:id – admin: update profile fields or role. Passwords are never changed here. */
exports.update = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');

  const updates = pick(req.body, ['name', 'email', 'phone', 'role', 'profileImage']);

  // Stop an admin from accidentally removing their own admin access
  if (user._id.equals(req.user._id) && updates.role && updates.role !== 'admin') {
    throw new ApiError(400, 'You cannot remove your own admin role');
  }

  Object.assign(user, updates);
  await user.save();
  return sendSuccess(res, { message: 'User updated successfully', data: user });
});

/** DELETE /api/users/:id – admin. Admins cannot delete themselves. */
exports.remove = asyncHandler(async (req, res) => {
  if (req.user._id.equals(req.params.id)) throw new ApiError(400, 'You cannot delete your own account');
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  return sendSuccess(res, { message: 'User deleted successfully', data: { id: user.id } });
});
