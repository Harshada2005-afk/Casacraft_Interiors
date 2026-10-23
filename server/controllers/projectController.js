const Project = require('../models/Project');
const crudFactory = require('./crudFactory');

/**
 * Projects – public read, admin write.
 * GET /api/projects supports:
 *   ?search=villa  ?category=Kitchen  ?style=Modern  ?status=Completed  ?featured=true
 *   ?sort=-year | title | createdAt   ?page=1  ?limit=12
 */
module.exports = crudFactory(Project, {
  name: 'Project',
  slug: true,
  fields: [
    'title',
    'location',
    'category',
    'style',
    'status',
    'featured',
    'year',
    'area',
    'duration',
    'image',
    'gallery',
    'before',
    'after',
    'description',
    'concept',
    'materials',
    'palette',
  ],
  list: {
    searchFields: ['title', 'location', 'description'],
    filterFields: ['category', 'style', 'status'],
    sortFields: ['createdAt', 'year', 'title', 'category', 'style', 'featured'],
    defaultSort: '-featured -year',
  },
});
