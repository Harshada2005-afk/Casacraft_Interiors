const express = require('express');
const { authMiddleware, optionalAuth } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const validate = require('../middleware/validate');

/**
 * Standard routes for a resource that everyone can read and only admins can change:
 *   GET    /        public (admins also see hidden items)
 *   GET    /:id     public (id or slug)
 *   POST   /        admin
 *   PUT    /:id     admin
 *   DELETE /:id     admin
 */
module.exports = function crudRoutes(controller, rules, { getOne = true } = {}) {
  const router = express.Router();
  const admin = [authMiddleware, adminMiddleware];

  router.get('/', optionalAuth, controller.getAll);
  if (getOne) router.get('/:id', optionalAuth, controller.getOne);
  router.post('/', ...admin, rules(false), validate, controller.create);
  router.put('/:id', ...admin, rules(true), validate, controller.update);
  router.delete('/:id', ...admin, controller.remove);

  return router;
};
