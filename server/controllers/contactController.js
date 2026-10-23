const ContactMessage = require('../models/ContactMessage');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const pick = require('../utils/pick');
const { sendSuccess } = require('../utils/apiResponse');
const { paginatedQuery } = require('../services/queryService');

/** POST /api/contact – anyone can send a message from the Contact page. */
exports.create = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create({ ...pick(req.body, ['name', 'email', 'phone', 'subject', 'message']), user: req.user?._id });
  return sendSuccess(res, {
    statusCode: 201,
    message: 'Message sent! Our team will get back to you within 24 hours.',
    data: { id: message.id, createdAt: message.createdAt },
  });
});

/** GET /api/contact – admin: all messages (?status=New ?search= ?page=). */
exports.getAll = asyncHandler(async (req, res) => {
  const { items, pagination } = await paginatedQuery(ContactMessage, req.query, {
    searchFields: ['name', 'email', 'subject', 'message'],
    filterFields: ['status'],
    sortFields: ['createdAt', 'status', 'name'],
    defaultSort: '-createdAt',
  });
  return sendSuccess(res, { message: 'Messages loaded', data: items, pagination });
});

/** PUT /api/contact/:id – admin: change status (New, Read, Replied, Archived). */
exports.update = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);
  if (!message) throw new ApiError(404, 'Message not found');
  message.status = req.body.status;
  await message.save();
  return sendSuccess(res, { message: 'Message updated successfully', data: message });
});

/** DELETE /api/contact/:id – admin. */
exports.remove = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) throw new ApiError(404, 'Message not found');
  return sendSuccess(res, { message: 'Message deleted successfully', data: { id: message.id } });
});
