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

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    return res.status(500).json({
        success: false,
        message: 'Something went wrong on the server'
    });
}

module.exports = errorHandler;