const { body, validationResult }  = require('express-validator');

registerValidation = [
    body('email', 'Неверный e-mail').isEmail(),
    body('passwordHash', 'Длина пароля должна быть минимум 6 символов').isLength({ min: 6 }),
    body('fullName', 'Имя должно содержать минимум 5 символов').isLength({ min: 5 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()
];

const validRegistration = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({errors: errors.array()});
    }
    next();
}

module.exports = {
    registerValidation,
    validRegistration
}