const express = require('express');
const c = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const validate = require('../middleware/validate');
const v = require('../middleware/validators');

const router = express.Router();

// Every user-management route is admin-only
router.use(authMiddleware, adminMiddleware);

router.get('/', c.getAll);
router.get('/:id', v.objectId(), validate, c.getOne);
router.put('/:id', v.userUpdate, validate, c.update);
router.delete('/:id', v.objectId(), validate, c.remove);

module.exports = router;
