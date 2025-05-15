const AppError = require('../errors/AppError')

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Express next function
 */

function errorHandler(err, req, res, next) {
    console.log('Error: ', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong on the server';
    return res.status(statusCode).json({
        success: false,
        message: message,
        data: null
    });
    
}

module.exports = errorHandler;