/**
 * Request validation rules (express-validator).
 * Each export is an array used in a route before the `validate` middleware.
 */
const { body, param } = require('express-validator');
const C = require('../config/constants');

const PHONE = /^\+?[0-9\s-]{10,15}$/;
const HEX = /^#[0-9a-fA-F]{6}$/;

// When `optional` is true (updates), every field may be left out.
const opt = (chain, optional) => (optional ? chain.optional() : chain);

const objectId = (name = 'id') => param(name).isMongoId().withMessage('Invalid id');

/* ---------------- Auth ---------------- */
const register = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }).withMessage('Name is too long'),
  body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail({ gmail_remove_dots: false }),
  body('phone').optional({ values: 'falsy' }).trim().matches(PHONE).withMessage('Please provide a valid phone number'),
  body('password')
    .isLength({ min: 8, max: 72 })
    .withMessage('Password must be 8–72 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must include an uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must include a number'),
  body('confirmPassword')
    .optional()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
];

const login = [
  body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail({ gmail_remove_dots: false }),
  body('password').notEmpty().withMessage('Password is required'),
];

const updateMe = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty').isLength({ max: 80 }),
  body('phone').optional({ values: 'falsy' }).trim().matches(PHONE).withMessage('Please provide a valid phone number'),
  body('profileImage').optional({ values: 'falsy' }).trim().isURL().withMessage('Profile image must be a URL'),
];

const changePassword = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8, max: 72 })
    .withMessage('New password must be 8–72 characters')
    .matches(/[A-Z]/)
    .withMessage('New password must include an uppercase letter')
    .matches(/[0-9]/)
    .withMessage('New password must include a number'),
];

/* ---------------- Projects ---------------- */
const project = (optional = false) => [
  opt(body('title'), optional).trim().notEmpty().withMessage('Project title is required').isLength({ max: 120 }),
  opt(body('location'), optional).trim().notEmpty().withMessage('Location is required'),
  opt(body('category'), optional).isIn(C.PROJECT_CATEGORIES).withMessage(`Category must be one of: ${C.PROJECT_CATEGORIES.join(', ')}`),
  opt(body('style'), optional).isIn(C.DESIGN_STYLES).withMessage(`Style must be one of: ${C.DESIGN_STYLES.join(', ')}`),
  body('status').optional().isIn(C.PROJECT_STATUSES).withMessage(`Status must be one of: ${C.PROJECT_STATUSES.join(', ')}`),
  body('featured').optional().isBoolean().withMessage('featured must be true or false').toBoolean(),
  body('year').optional().isInt({ min: 1990, max: 2100 }).withMessage('Year must be between 1990 and 2100').toInt(),
  body(['image', 'before', 'after']).optional({ values: 'falsy' }).trim().isURL({ require_tld: false }).withMessage('Images must be URLs'),
  body('gallery').optional().isArray({ max: 30 }).withMessage('gallery must be a list of image URLs'),
  body('gallery.*').optional().trim().isURL({ require_tld: false }).withMessage('Gallery images must be URLs'),
  body('materials').optional().isArray({ max: 30 }).withMessage('materials must be a list'),
  body('palette').optional().isArray({ max: 12 }).withMessage('palette must be a list'),
  body('palette.*.hex').optional().matches(HEX).withMessage('Palette colours must be hex values like #A1B2C3'),
  body(['description', 'concept']).optional().isString().isLength({ max: 5000 }),
];

/* ---------------- Services ---------------- */
const service = (optional = false) => [
  opt(body('title'), optional).trim().notEmpty().withMessage('Service title is required').isLength({ max: 120 }),
  opt(body('short'), optional).trim().notEmpty().withMessage('A short description is required').isLength({ max: 300 }),
  body('description').optional().isString().isLength({ max: 3000 }),
  body('icon').optional().trim().isAlphanumeric().withMessage('icon must be a Lucide icon name such as "Sofa"'),
  body('image').optional({ values: 'falsy' }).trim().isURL({ require_tld: false }).withMessage('image must be a URL'),
  body('features').optional().isArray({ max: 20 }).withMessage('features must be a list'),
  body('features.*').optional().isString().trim().notEmpty(),
  body('startingPrice').optional().isString().trim().isLength({ max: 40 }),
  body('order').optional().isInt().toInt(),
  body('isActive').optional().isBoolean().toBoolean(),
];

/* ---------------- Consultations ---------------- */
const consultation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required').isLength({ max: 80 }),
  body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail({ gmail_remove_dots: false }),
  body('phone').trim().matches(PHONE).withMessage('Please provide a valid phone number'),
  body('propertyType').isIn(C.PROPERTY_TYPES).withMessage(`Property type must be one of: ${C.PROPERTY_TYPES.join(', ')}`),
  body('projectType').isIn(C.PROJECT_TYPES).withMessage(`Project type must be one of: ${C.PROJECT_TYPES.join(', ')}`),
  body('location').trim().notEmpty().withMessage('Location is required').isLength({ max: 120 }),
  body('budget').isIn(C.BUDGETS).withMessage(`Budget must be one of: ${C.BUDGETS.join(', ')}`),
  body('designStyle').isIn(C.DESIGN_STYLES).withMessage(`Design style must be one of: ${C.DESIGN_STYLES.join(', ')}`),
  body('preferredDate')
    .isISO8601()
    .withMessage('Preferred date must be a valid date (YYYY-MM-DD)')
    .bail()
    .custom((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(value) >= today;
    })
    .withMessage('Preferred date cannot be in the past'),
  body('message').optional().isString().trim().isLength({ max: 2000 }).withMessage('Message is too long'),
];

const consultationStatus = [
  objectId(),
  body('status').isIn(C.CONSULTATION_STATUSES).withMessage(`Status must be one of: ${C.CONSULTATION_STATUSES.join(', ')}`),
  body('adminNotes').optional().isString().trim().isLength({ max: 2000 }),
];

/* ---------------- Testimonials ---------------- */
const testimonial = (optional = false) => [
  opt(body('name'), optional).trim().notEmpty().withMessage('Customer name is required').isLength({ max: 80 }),
  opt(body('review'), optional).trim().notEmpty().withMessage('Review text is required').isLength({ max: 1500 }),
  opt(body('rating'), optional).isInt({ min: 1, max: 5 }).withMessage('Rating must be a whole number from 1 to 5').toInt(),
  body(['location', 'projectType']).optional().isString().trim().isLength({ max: 80 }),
  body('image').optional({ values: 'falsy' }).trim().isURL({ require_tld: false }).withMessage('image must be a URL'),
  body('isPublished').optional().isBoolean().toBoolean(),
];

/* ---------------- Blog ---------------- */
const blogPost = (optional = false) => [
  opt(body('title'), optional).trim().notEmpty().withMessage('Title is required').isLength({ max: 160 }),
  opt(body('category'), optional).isIn(C.BLOG_CATEGORIES).withMessage(`Category must be one of: ${C.BLOG_CATEGORIES.join(', ')}`),
  opt(body('excerpt'), optional).trim().notEmpty().withMessage('Excerpt is required').isLength({ max: 400 }),
  body('image').optional({ values: 'falsy' }).trim().isURL({ require_tld: false }).withMessage('image must be a URL'),
  body(['author', 'authorRole', 'readTime']).optional().isString().trim().isLength({ max: 80 }),
  body('content').optional().isArray({ max: 200 }).withMessage('content must be a list of blocks'),
  body('content.*.type').optional().isIn(['p', 'h2', 'quote']).withMessage('Block type must be p, h2 or quote'),
  body('content.*.text').optional().isString().trim().notEmpty().withMessage('Block text is required'),
  body('isPublished').optional().isBoolean().toBoolean(),
  body('publishedAt').optional().isISO8601().toDate(),
];

/* ---------------- Contact ---------------- */
const contact = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
  body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail({ gmail_remove_dots: false }),
  body('phone').optional({ values: 'falsy' }).trim().matches(PHONE).withMessage('Please provide a valid phone number'),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 150 }),
  body('message').trim().isLength({ min: 10, max: 3000 }).withMessage('Message must be 10–3000 characters'),
];

const contactUpdate = [
  objectId(),
  body('status').isIn(C.CONTACT_STATUSES).withMessage(`Status must be one of: ${C.CONTACT_STATUSES.join(', ')}`),
];

/* ---------------- Users (admin) ---------------- */
const userUpdate = [
  objectId(),
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty').isLength({ max: 80 }),
  body('email').optional().trim().isEmail().withMessage('Please provide a valid email').normalizeEmail({ gmail_remove_dots: false }),
  body('phone').optional({ values: 'falsy' }).trim().matches(PHONE).withMessage('Please provide a valid phone number'),
  body('role').optional().isIn(C.ROLES).withMessage(`Role must be one of: ${C.ROLES.join(', ')}`),
  body('profileImage').optional({ values: 'falsy' }).trim().isURL().withMessage('Profile image must be a URL'),
];

module.exports = {
  objectId,
  register,
  login,
  updateMe,
  changePassword,
  project,
  service,
  consultation,
  consultationStatus,
  testimonial,
  blogPost,
  contact,
  contactUpdate,
  userUpdate,
};
