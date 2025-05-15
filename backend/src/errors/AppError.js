class AppError extends Error {
    /**
        * Create a new AppError instance
        * @param {string} message - Error message
        * @param {number} statusCode - HTTP status code
    */   
    constructor(message, statusCode) {
        super(message),
        this.statusCode = statusCode
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;