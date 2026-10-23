const Consultation = require('../models/Consultation');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const pick = require('../utils/pick');
const { sendSuccess } = require('../utils/apiResponse');
const { paginatedQuery } = require('../services/queryService');

const FIELDS = ['fullName', 'email', 'phone', 'propertyType', 'projectType', 'location', 'budget', 'designStyle', 'preferredDate', 'message'];

const LIST_OPTIONS = {
  searchFields: ['fullName', 'email', 'reference', 'location'],
  filterFields: ['status', 'projectType', 'budget', 'designStyle'],
  sortFields: ['createdAt', 'preferredDate', 'status', 'fullName'],
  defaultSort: '-createdAt',
};

/**
 * POST /api/consultations
 * Anyone can book (the website form is public). When a logged-in customer
 * books, the request is linked to their account and shows in "My Consultations".
 */
exports.create = asyncHandler(async (req, res) => {
  const consultation = await Consultation.create({ ...pick(req.body, FIELDS), user: req.user?._id, status: 'Pending' });
  return sendSuccess(res, {
    statusCode: 201,
    message: 'Thank you! Your consultation request has been received.',
    data: consultation,
  });
});

/** GET /api/consultations/my – the logged-in customer's consultations. */
exports.getMine = asyncHandler(async (req, res) => {
  const { items, pagination } = await paginatedQuery(Consultation, req.query, {
    ...LIST_OPTIONS,
    searchFields: [],
    baseFilter: { user: req.user._id },
    select: '-adminNotes',
  });
  return sendSuccess(res, { message: 'Consultations loaded', data: items, pagination });
});

/** GET /api/consultations/:id – the owner or an admin. */
exports.getOne = asyncHandler(async (req, res) => {
  const consultation = await Consultation.findById(req.params.id).populate('user', 'name email phone');
  if (!consultation) throw new ApiError(404, 'Consultation not found');

  const isOwner = consultation.user && consultation.user._id.equals(req.user._id);
  if (!isOwner && req.user.role !== 'admin') throw new ApiError(403, 'You do not have permission to view this consultation');

  const data = consultation.toJSON();
  if (req.user.role !== 'admin') delete data.adminNotes;
  return sendSuccess(res, { message: 'Consultation loaded', data });
});

/** GET /api/consultations – admin: all consultations with filters. */
exports.getAll = asyncHandler(async (req, res) => {
  const { items, pagination } = await paginatedQuery(Consultation, req.query, { ...LIST_OPTIONS, populate: { path: 'user', select: 'name email' } });
  return sendSuccess(res, { message: 'Consultations loaded', data: items, pagination });
});

/** PUT /api/consultations/:id/status – admin: change status (and optional notes). */
exports.updateStatus = asyncHandler(async (req, res) => {
  const consultation = await Consultation.findById(req.params.id);
  if (!consultation) throw new ApiError(404, 'Consultation not found');
  consultation.status = req.body.status;
  if (req.body.adminNotes !== undefined) consultation.adminNotes = req.body.adminNotes;
  await consultation.save();
  return sendSuccess(res, { message: `Consultation marked as ${consultation.status}`, data: consultation });
});

/** DELETE /api/consultations/:id – admin. */
exports.remove = asyncHandler(async (req, res) => {
  const consultation = await Consultation.findByIdAndDelete(req.params.id);
  if (!consultation) throw new ApiError(404, 'Consultation not found');
  return sendSuccess(res, { message: 'Consultation deleted successfully', data: { id: consultation.id } });
});
