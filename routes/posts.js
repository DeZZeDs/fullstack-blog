const Router = require('express');
const router = new Router();
const postController = require('../controllers/PostController');
const handleValidationErrors = require('../middleware/handleValidationErrors.js');
const checkAuth = require('../middleware/checkAuth.js');
const postValidation = require('../validation/Post.js');

router.post('/', checkAuth, postValidation, handleValidationErrors, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostByID);
router.delete('/:id', checkAuth, postController.deletePost);
router.patch('/:id', checkAuth, handleValidationErrors, postController.updatePost);

module.exports = router;