const mongoose = require('mongoose');
const { cleanJSON } = require('./plugins');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Customer name is required'], trim: true, maxlength: 80 },
    location: { type: String, trim: true },
    projectType: { type: String, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: [true, 'Review text is required'], trim: true, maxlength: 1500 },
    image: { type: String, trim: true, default: '' },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

cleanJSON(testimonialSchema);

module.exports = mongoose.model('Testimonial', testimonialSchema);
