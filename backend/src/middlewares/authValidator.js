const InvalidLengthError = require('../errors/InvalidLengthError');
const InvalidFormatError = require('../errors/InvalidFormatError');
const MissingFieldError = require('../errors/MissingFieldError');




const authValidator = {
    /** 
     * Middleware to validate user registration data 
     * password >= 6 
     * name, email <= 50
     * */
    validateRegistration: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            // Check missing fields
            if (!name) {
                throw new MissingFieldError('Missing "name" field');
            }
            if (!email) {
                throw new MissingFieldError('Missing "email" field');
            }
            if (!password) {
                throw new MissingFieldError('Missing "password" field');
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new InvalidFormatError('Invalid email');
            }

            // Validate name length
            if (name.length > 50) {
                throw new InvalidLengthError('Name must be less than 50 characters');
            }

            // Validate email length
            if (email.length > 50) {
                throw new InvalidLengthError('Email must be less than 50 characters');
            }

            // Validate password strength (at least 6 characters)
            if (password.length < 6) {
                throw new InvalidLengthError('Password must be at least 6 characters');
            }

            next();
        } catch (error) {
            next(error);
        }
    },

    /**
     * Middleware to validate user login data
     */
    validateLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // Check if all fields are provided
            if (!email) {
                throw new MissingFieldError('Missing "email" field');
            }
            if (!password) {
                throw new MissingFieldError('Missing "password" field');
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new InvalidFormatError("Invalid email");
            }
            next();
        } catch (error) {
            next(error);
        }
    }
};
    module.exports = authValidator;