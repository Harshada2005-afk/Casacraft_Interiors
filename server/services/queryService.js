/**
 * Turns query-string options into a Mongoose query with
 * search, filters, sorting and pagination.
 *
 *   GET /api/projects?search=villa&category=Villa&style=Luxury&sort=-year&page=2&limit=6
 */
const MAX_LIMIT = 50;

// Escapes user text before using it in a regular expression
const escapeRegex = (text) => String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * @param {import('mongoose').Model} Model
 * @param {object} query            req.query
 * @param {object} options
 * @param {string[]} options.searchFields  fields matched by ?search=
 * @param {string[]} options.filterFields  exact-match filters allowed from the query string
 * @param {string[]} options.sortFields    fields the client may sort by
 * @param {string}   options.defaultSort
 * @param {object}   options.baseFilter    filter always applied (e.g. only published posts)
 * @param {string|object} options.populate
 */
async function paginatedQuery(Model, query, options = {}) {
  const {
    searchFields = [],
    filterFields = [],
    sortFields = ['createdAt'],
    defaultSort = '-createdAt',
    baseFilter = {},
    populate,
    select,
  } = options;

  const filter = { ...baseFilter };

  // Exact-match filters (only whitelisted fields, only plain strings)
  filterFields.forEach((field) => {
    const value = query[field];
    if (typeof value === 'string' && value && value !== 'All') filter[field] = value;
  });

  if (query.featured === 'true') filter.featured = true;

  // Case-insensitive search across several fields
  if (typeof query.search === 'string' && query.search.trim() && searchFields.length) {
    const pattern = new RegExp(escapeRegex(query.search.trim().slice(0, 100)), 'i');
    filter.$or = searchFields.map((field) => ({ [field]: pattern }));
  }

  // Sorting: "title", "-year", or "category,-createdAt"
  const sort = String(query.sort || defaultSort)
    .split(',')
    .map((s) => s.trim())
    .filter((s) => sortFields.includes(s.replace(/^-/, '')))
    .join(' ') || defaultSort;

  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(query.limit, 10) || 12));

  let q = Model.find(filter).sort(sort).skip((page - 1) * limit).limit(limit);
  if (populate) q = q.populate(populate);
  if (select) q = q.select(select);

  const [items, total] = await Promise.all([q, Model.countDocuments(filter)]);

  return {
    items,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
  };
}

module.exports = { paginatedQuery, escapeRegex };
