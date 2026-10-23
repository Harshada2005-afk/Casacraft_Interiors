const mongoose = require('mongoose');
const { cleanJSON } = require('./plugins');
const { CONSULTATION_STATUSES, BUDGETS, DESIGN_STYLES, PROPERTY_TYPES, PROJECT_TYPES } = require('../config/constants');

const consultationSchema = new mongoose.Schema(
  {
    // Human-friendly reference shown to customers, e.g. CN-4821
    reference: { type: String, unique: true },
    // Set when a logged-in customer books; empty for guest requests
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    propertyType: { type: String, required: true, enum: PROPERTY_TYPES },
    projectType: { type: String, required: true, enum: PROJECT_TYPES },
    location: { type: String, required: true, trim: true },
    budget: { type: String, required: true, enum: BUDGETS },
    designStyle: { type: String, required: true, enum: DESIGN_STYLES },
    preferredDate: { type: Date, required: true },
    message: { type: String, trim: true, maxlength: 2000 },
    status: { type: String, enum: CONSULTATION_STATUSES, default: 'Pending', index: true },
    adminNotes: { type: String, trim: true, maxlength: 2000 },
  },
  { timestamps: true },
);

consultationSchema.pre('validate', function setReference() {
  if (!this.reference) this.reference = `CN-${Date.now().toString(36).toUpperCase().slice(-5)}${Math.floor(Math.random() * 90 + 10)}`;
});

cleanJSON(consultationSchema);

module.exports = mongoose.model('Consultation', consultationSchema);
