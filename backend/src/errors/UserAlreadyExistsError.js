const AppError = require('./AppError');

class UserAlreadyExistsError extends AppError {
    constructor(message = 'User already exists') {
        super(message, 409); // 409 Conflict
    }
}

module.exports = UserAlreadyExistsError;