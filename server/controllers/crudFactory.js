/**
 * Small helpers that build the standard list / get / create / update / delete
 * handlers for a model, so each resource controller stays short and consistent.
 */
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const pick = require('../utils/pick');
const slugify = require('../utils/slugify');
const { sendSuccess } = require('../utils/apiResponse');
const { paginatedQuery } = require('../services/queryService');
const findByIdOrSlug = require('../services/findByIdOrSlug');

const isAdmin = (req) => req.user?.role === 'admin';

/**
 * @param {import('mongoose').Model} Model
 * @param {object} cfg
 * @param {string} cfg.name           Human name, e.g. "Project"
 * @param {string[]} cfg.fields       Fields a client may write
 * @param {object} cfg.list           Options for paginatedQuery
 * @param {object} cfg.publicFilter   Filter applied for non-admins (e.g. only published)
 * @param {boolean} cfg.slug          Model has a slug generated from `title`
 */
module.exports = function crudFactory(Model, cfg) {
  const { name, fields, list = {}, publicFilter = {}, slug = false } = cfg;

  const getAll = asyncHandler(async (req, res) => {
    const baseFilter = isAdmin(req) ? {} : publicFilter;
    const { items, pagination } = await paginatedQuery(Model, req.query, { ...list, baseFilter });
    return sendSuccess(res, { message: `${name}s loaded`, data: items, pagination });
  });

  const getOne = asyncHandler(async (req, res) => {
    const doc = await findByIdOrSlug(Model, req.params.id, isAdmin(req) ? {} : publicFilter);
    if (!doc) throw new ApiError(404, `${name} not found`);
    return sendSuccess(res, { message: `${name} loaded`, data: doc });
  });

  const create = asyncHandler(async (req, res) => {
    const data = pick(req.body, fields);
    if (slug && !data.slug && data.title) data.slug = await uniqueSlug(data.title);
    const doc = await Model.create(data);
    return sendSuccess(res, { statusCode: 201, message: `${name} created successfully`, data: doc });
  });

  const update = asyncHandler(async (req, res) => {
    const doc = await findByIdOrSlug(Model, req.params.id);
    if (!doc) throw new ApiError(404, `${name} not found`);
    Object.assign(doc, pick(req.body, fields));
    await doc.save(); // save() (not findByIdAndUpdate) so schema validation and hooks run
    return sendSuccess(res, { message: `${name} updated successfully`, data: doc });
  });

  const remove = asyncHandler(async (req, res) => {
    const doc = await findByIdOrSlug(Model, req.params.id);
    if (!doc) throw new ApiError(404, `${name} not found`);
    await doc.deleteOne();
    return sendSuccess(res, { message: `${name} deleted successfully`, data: { id: doc.id } });
  });

  // Adds -2, -3… when a slug is already taken
  async function uniqueSlug(title) {
    const base = slugify(title) || 'item';
    let candidate = base;
    for (let i = 2; await Model.exists({ slug: candidate }); i += 1) candidate = `${base}-${i}`;
    return candidate;
  }

  return { getAll, getOne, create, update, remove };
};
