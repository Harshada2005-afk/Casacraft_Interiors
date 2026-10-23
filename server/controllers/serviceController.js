const Service = require('../models/Service');
const crudFactory = require('./crudFactory');

/** Services – public read (active only), admin write. */
module.exports = crudFactory(Service, {
  name: 'Service',
  slug: true,
  fields: ['title', 'icon', 'image', 'short', 'description', 'features', 'startingPrice', 'order', 'isActive'],
  publicFilter: { isActive: true },
  list: {
    searchFields: ['title', 'short'],
    sortFields: ['order', 'title', 'createdAt'],
    defaultSort: 'order title',
  },
});
