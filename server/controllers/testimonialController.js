const Testimonial = require('../models/Testimonial');
const crudFactory = require('./crudFactory');

/** Testimonials – public read (published only), admin write. */
module.exports = crudFactory(Testimonial, {
  name: 'Testimonial',
  fields: ['name', 'location', 'projectType', 'rating', 'review', 'image', 'isPublished'],
  publicFilter: { isPublished: true },
  list: {
    searchFields: ['name', 'review', 'location'],
    filterFields: ['projectType'],
    sortFields: ['createdAt', 'rating', 'name'],
    defaultSort: '-rating -createdAt',
  },
});
