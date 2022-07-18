const Router = require('express');
const router = new Router();
const loginUser = require('../routes/loginUser.js');
const registerUser = require('../routes/registerUser.js');
const getProfile = require('../routes/getProfile.js');
const uploadRoute = require('../routes/upload.js');
const posts = require('../routes/posts.js');
const tags = require('../routes/getTags.js');

router.use('/login', loginUser);
router.use('/register', registerUser);
router.use('/me', getProfile);
router.use('/upload', uploadRoute);
router.use('/posts', posts);
router.use('/tags', tags);

module.exports = router;