const AppError = require('./AppError');

class ResourceNotFoundError extends AppError {
    constructor(message) {
        super(message, 404); // 404 Not Found
    }
}

module.exports = ResourceNotFoundError;