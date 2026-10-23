const crudRoutes = require('./crudRoutes');
const controller = require('../controllers/serviceController');
const v = require('../middleware/validators');

module.exports = crudRoutes(controller, v.service);
