const { body }  = require('express-validator');

const postValidation = [
    body('title', 'Заголовок статьи должен содержать минимум 6 символов').isLength({ min: 6 }).isString(),
    body('text', 'Текст статьи должен содержать минимум 6 символов').isLength({ min: 6 }),
    body('tags', '').optional().isString(),
    body('imageUrl', 'Неверная ссылка').optional().isURL()
];

module.exports = postValidation;