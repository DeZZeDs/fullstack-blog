const Router = require('express');
const router = new Router();
const handleValidationErrors = require('../middleware/handleValidationErrors.js');
const userController = require('../controllers/UserController.js');
router.post('/', handleValidationErrors , userController.loginUser);
module.exports = router;