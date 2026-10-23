const mongoose = require('mongoose');

/**
 * Finds a document by its MongoDB id OR its slug, so the frontend can
 * keep friendly URLs like /portfolio/contemporary-villa.
 */
module.exports = function findByIdOrSlug(Model, idOrSlug, extraFilter = {}) {
  const filter = mongoose.isObjectIdOrHexString(idOrSlug) ? { _id: idOrSlug } : { slug: String(idOrSlug).toLowerCase() };
  return Model.findOne({ ...filter, ...extraFilter });
};
