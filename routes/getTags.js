const Router = require('express');
const router = new Router();
const PostController = require('../controllers/PostController.js');
router.get('/', PostController.getTags);
module.exports = router;