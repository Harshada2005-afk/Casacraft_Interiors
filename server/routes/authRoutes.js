const express = require('express');
const auth = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiters');
const validate = require('../middleware/validate');
const v = require('../middleware/validators');

const router = express.Router();

router.post('/register', authLimiter, v.register, validate, auth.register);
router.post('/login', authLimiter, v.login, validate, auth.login);
router.get('/me', authMiddleware, auth.getMe);
router.put('/me', authMiddleware, v.updateMe, validate, auth.updateMe);
router.put('/password', authMiddleware, authLimiter, v.changePassword, validate, auth.changePassword);

module.exports = router;
