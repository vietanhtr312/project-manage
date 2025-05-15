const AppError = require('./AppError');

class InvalidDateError extends AppError {
    constructor(message) {
        super(message, 400); // 400, Bad Request
    }
}

module.exports = InvalidDateError;