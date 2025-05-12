const AppError = require('./AppError');

class InvalidLengthError extends AppError {
    constructor(message) {
        super(message, 400); // 400, Bad Request
    }
}

module.exports = InvalidLengthError;