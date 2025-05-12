const AppError = require('./AppError');

class InvalidFormatError extends AppError {
    constructor(message) {
        super(message, 400); // 400, Bad Request
    }
}

module.exports = InvalidFormatError;