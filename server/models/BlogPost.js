const mongoose = require('mongoose');
const slugify = require('../utils/slugify');
const { cleanJSON } = require('./plugins');
const { BLOG_CATEGORIES } = require('../config/constants');

// An article is a list of blocks so the frontend can render headings,
// paragraphs and quotes without storing raw HTML (safer against XSS).
const blockSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['p', 'h2', 'quote'], default: 'p' },
    text: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 160 },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, enum: BLOG_CATEGORIES },
    excerpt: { type: String, required: true, trim: true, maxlength: 400 },
    image: { type: String, trim: true, default: '' },
    author: { type: String, trim: true, default: 'CasaCraft Studio' },
    authorRole: { type: String, trim: true },
    readTime: { type: String, trim: true },
    content: [blockSchema],
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

blogPostSchema.index({ title: 'text', excerpt: 'text' });

blogPostSchema.pre('validate', function setSlug() {
  if (!this.slug && this.title) this.slug = slugify(this.title);
});

cleanJSON(blogPostSchema);

module.exports = mongoose.model('BlogPost', blogPostSchema);
