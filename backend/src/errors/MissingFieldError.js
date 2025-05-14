const AppError = require('./AppError');

class MissingFieldError extends AppError {
    constructor(message) {
        super(message, 400); // 400, Bad Request
    }
}

module.exports = MissingFieldError;