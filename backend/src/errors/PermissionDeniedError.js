const AppError = require('./AppError');

class PermissionDeniedError extends AppError {
    constructor(message) {
        super(message, 403); // 403, Forbidden
    }
}

module.exports = PermissionDeniedError;