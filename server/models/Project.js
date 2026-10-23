const mongoose = require('mongoose');
const slugify = require('../utils/slugify');
const { cleanJSON } = require('./plugins');
const { PROJECT_CATEGORIES, DESIGN_STYLES, PROJECT_STATUSES } = require('../config/constants');

const paletteSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    hex: { type: String, trim: true, match: [/^#[0-9a-fA-F]{6}$/, 'Colour must be a hex value like #A1B2C3'] },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Project title is required'], trim: true, maxlength: 120 },
    // URL-friendly id used by the frontend: /portfolio/modern-minimalist-residence
    slug: { type: String, unique: true, lowercase: true, trim: true },
    location: { type: String, required: [true, 'Location is required'], trim: true },
    category: { type: String, required: true, enum: PROJECT_CATEGORIES },
    style: { type: String, required: true, enum: DESIGN_STYLES },
    status: { type: String, enum: PROJECT_STATUSES, default: 'Completed' },
    featured: { type: Boolean, default: false },
    year: { type: Number, min: 1990, max: 2100 },
    area: { type: String, trim: true },
    duration: { type: String, trim: true },
    image: { type: String, trim: true, default: '' },
    gallery: [{ type: String, trim: true }],
    before: { type: String, trim: true },
    after: { type: String, trim: true },
    description: { type: String, trim: true, maxlength: 5000 },
    concept: { type: String, trim: true, maxlength: 5000 },
    materials: [{ type: String, trim: true }],
    palette: [paletteSchema],
  },
  { timestamps: true },
);

// Text index powers ?search= on title, location and description
projectSchema.index({ title: 'text', location: 'text', description: 'text' });
projectSchema.index({ category: 1, style: 1 });

projectSchema.pre('validate', function setSlug() {
  if (!this.slug && this.title) this.slug = slugify(this.title);
});

cleanJSON(projectSchema);

module.exports = mongoose.model('Project', projectSchema);
