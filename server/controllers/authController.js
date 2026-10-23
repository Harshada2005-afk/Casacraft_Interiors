const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const pick = require('../utils/pick');
const { sendSuccess } = require('../utils/apiResponse');
const { signToken } = require('../services/tokenService');

/**
 * POST /api/auth/register
 * Creates a CUSTOMER account. The role can never be chosen by the client.
 */
exports.register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (await User.exists({ email })) throw new ApiError(409, 'An account with this email already exists');

  const user = await User.create({ name, email, phone, password, role: 'customer' });

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Account created successfully',
    data: { user, token: signToken(user) },
  });
});

/**
 * POST /api/auth/login
 * Works for customers and admins. The frontend's admin login screen should
 * check that `data.user.role === 'admin'`.
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  // Same message for "no such user" and "wrong password" so attackers can't discover emails
  if (!user || !(await user.comparePassword(password))) throw new ApiError(401, 'Invalid email or password');

  return sendSuccess(res, { message: 'Logged in successfully', data: { user, token: signToken(user) } });
});

/** GET /api/auth/me – the logged-in user's profile. */
exports.getMe = asyncHandler(async (req, res) => sendSuccess(res, { message: 'Profile loaded', data: req.user }));

/** PUT /api/auth/me – update own name, phone or profile image. */
exports.updateMe = asyncHandler(async (req, res) => {
  Object.assign(req.user, pick(req.body, ['name', 'phone', 'profileImage']));
  await req.user.save();
  return sendSuccess(res, { message: 'Profile updated successfully', data: req.user });
});

/** PUT /api/auth/password – change own password. */
exports.changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.comparePassword(req.body.currentPassword))) throw new ApiError(401, 'Current password is incorrect');
  user.password = req.body.newPassword;
  await user.save();
  return sendSuccess(res, { message: 'Password changed successfully', data: { token: signToken(user) } });
});
