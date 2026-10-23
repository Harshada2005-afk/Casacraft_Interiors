const express = require('express');
const c = require('../controllers/contactController');
const { authMiddleware, optionalAuth } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { formLimiter } = require('../middleware/rateLimiters');
const validate = require('../middleware/validate');
const v = require('../middleware/validators');

const router = express.Router();
const admin = [authMiddleware, adminMiddleware];

router.post('/', formLimiter, optionalAuth, v.contact, validate, c.create);
router.get('/', ...admin, c.getAll);
router.put('/:id', ...admin, v.contactUpdate, validate, c.update);
router.delete('/:id', ...admin, v.objectId(), validate, c.remove);

module.exports = router;
