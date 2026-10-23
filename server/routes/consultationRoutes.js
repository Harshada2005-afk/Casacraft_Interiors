const express = require('express');
const c = require('../controllers/consultationController');
const { authMiddleware, optionalAuth } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { formLimiter } = require('../middleware/rateLimiters');
const validate = require('../middleware/validate');
const v = require('../middleware/validators');

const router = express.Router();
const admin = [authMiddleware, adminMiddleware];

// Order matters: "/my" must come before "/:id"
router.post('/', formLimiter, optionalAuth, v.consultation, validate, c.create);
router.get('/my', authMiddleware, c.getMine);
router.get('/', ...admin, c.getAll);
router.get('/:id', authMiddleware, v.objectId(), validate, c.getOne);
router.put('/:id/status', ...admin, v.consultationStatus, validate, c.updateStatus);
router.delete('/:id', ...admin, v.objectId(), validate, c.remove);

module.exports = router;
