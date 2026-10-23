const crudRoutes = require('./crudRoutes');
const controller = require('../controllers/projectController');
const v = require('../middleware/validators');

module.exports = crudRoutes(controller, v.project);
