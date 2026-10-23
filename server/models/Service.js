const mongoose = require('mongoose');
const slugify = require('../utils/slugify');
const { cleanJSON } = require('./plugins');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Service title is required'], trim: true, maxlength: 120 },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    // Lucide icon name, e.g. "Sofa" – the frontend maps it to an icon
    icon: { type: String, trim: true, default: 'Sparkles' },
    image: { type: String, trim: true, default: '' },
    short: { type: String, required: [true, 'A short description is required'], trim: true, maxlength: 300 },
    description: { type: String, trim: true, maxlength: 3000 },
    features: [{ type: String, trim: true }],
    startingPrice: { type: String, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

serviceSchema.pre('validate', function setSlug() {
  if (!this.slug && this.title) this.slug = slugify(this.title);
});

cleanJSON(serviceSchema);

module.exports = mongoose.model('Service', serviceSchema);
