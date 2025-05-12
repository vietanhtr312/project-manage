const AppError = require('./AppError');

class InvalidCredentialsError extends AppError {
    constructor(message = 'Invalid Credentials') {
        super(message, 401); // 401 Unauthorized
    }
}

module.exports = InvalidCredentialsError;