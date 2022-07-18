const Router = require('express');
const router = new Router();
const handleValidationErrors = require('../middleware/handleValidationErrors.js');
const {registerValidation, validRegistration} = require('../validation/Auth.js');

const userController = require('../controllers/UserController.js');
router.post('/', registerValidation, validRegistration, handleValidationErrors, userController.registerUser);

module.exports = router;