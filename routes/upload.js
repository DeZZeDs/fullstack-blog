const Router = require('express');
const router = new Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(_, __, callback) => {
        callback(null, 'uploads');
    },
    filename:(_, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage });
router.post('/', upload.single('image'), (request, response) => {
    return response.json({
        url: `/uploads/${request.file.originalname}`
    });
});
module.exports = router;