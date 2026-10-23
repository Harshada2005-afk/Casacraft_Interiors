const BlogPost = require('../models/BlogPost');
const crudFactory = require('./crudFactory');

/**
 * Blog – public read (published only), admin write.
 * GET /api/blog supports ?search= ?category= ?sort=-publishedAt ?page= ?limit=
 * GET /api/blog/:id accepts the post id or its slug.
 */
module.exports = crudFactory(BlogPost, {
  name: 'Blog post',
  slug: true,
  fields: ['title', 'category', 'excerpt', 'image', 'author', 'authorRole', 'readTime', 'content', 'isPublished', 'publishedAt'],
  publicFilter: { isPublished: true },
  list: {
    searchFields: ['title', 'excerpt'],
    filterFields: ['category'],
    sortFields: ['publishedAt', 'createdAt', 'title'],
    defaultSort: '-publishedAt',
  },
});
