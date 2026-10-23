const crudRoutes = require('./crudRoutes');
const controller = require('../controllers/blogController');
const v = require('../middleware/validators');

module.exports = crudRoutes(controller, v.blogPost);
