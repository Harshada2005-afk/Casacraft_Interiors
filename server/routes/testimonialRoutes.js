const crudRoutes = require('./crudRoutes');
const controller = require('../controllers/testimonialController');
const v = require('../middleware/validators');

// The spec has no "get one" endpoint for testimonials
module.exports = crudRoutes(controller, v.testimonial, { getOne: false });
