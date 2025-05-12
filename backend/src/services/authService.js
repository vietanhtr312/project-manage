const User = require('../models/User');
const jwtUtils = require('../utils/jwtUtils')
const passwordUtils = require('..utils/passwordUtils');

const authService = {
    /**
     * Register a new user
     * @param {string} name - User's name
     * @param {string} email - User's email
     * @param {string} password -User's password
     * @returns {Object} User data and token
     */
    registerUser: async(name, email, password) => {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            
        }
    }
};
