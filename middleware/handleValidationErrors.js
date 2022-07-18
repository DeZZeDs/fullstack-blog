const {validationResult} = require('express-validator');

const handleValidationErrors = (request, response, next) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json(errors.array());
    }
    next();
}

module.exports = handleValidationErrors;

