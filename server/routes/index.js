const express = require('express');

const router = express.Router();

router.get('/health', (_req, res) => res.json({ success: true, message: 'CasaCraft API is running', data: { time: new Date().toISOString() } }));

router.use('/auth', require('./authRoutes'));
router.use('/projects', require('./projectRoutes'));
router.use('/services', require('./serviceRoutes'));
router.use('/consultations', require('./consultationRoutes'));
router.use('/testimonials', require('./testimonialRoutes'));
router.use('/blog', require('./blogRoutes'));
router.use('/contact', require('./contactRoutes'));
router.use('/users', require('./userRoutes'));

module.exports = router;
