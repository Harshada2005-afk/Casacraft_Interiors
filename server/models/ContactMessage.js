const mongoose = require('mongoose');
const { cleanJSON } = require('./plugins');
const { CONTACT_STATUSES } = require('../config/constants');

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true, maxlength: 150 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    status: { type: String, enum: CONTACT_STATUSES, default: 'New', index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

cleanJSON(contactMessageSchema);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
