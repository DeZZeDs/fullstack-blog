const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController.js');
const checkAuth = require('../middleware/checkAuth.js');

router.get('/', checkAuth , userController.getProfile);

module.exports = router;