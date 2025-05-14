const jwt = require('jsonwebtoken');

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 
const JWT_EXPIRATION_TIME = '1d'; // Token expires in 1 day

const tokenUtils = {
    /**
     * Generate JWT token
     * @param {string} userId - User ID
     * @returns {string} - JWT token
     */
    generateToken: (userId) => {
        return jwt.sign(
            { id: userId },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION_TIME }
        );
    },

    /**
     * Verify JWT token
     * @param {string} token - JWT token
     * @returns {Object} - Decoded token
     */
    verifyToken: (token) => {
        return jwt.verify(token, JWT_SECRET);
    }
};

module.exports = tokenUtils;