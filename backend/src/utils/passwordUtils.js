const bcrypt = require('bcryptjs');

const passwordUtils = {
    /**
     * Hash a password
     * @param {string} password - Plain text password
     * @returns {Promise<string>} - Hashed password
     */
    hashPassword: async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },

    /**
     * Compare password with hash
     * @param {string} password - Plain text password
     * @param {string} hash - Hashed password
     * @returns {Promise<boolean>} - True if match, false otherwise
     */
    comparePassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    }
};

module.exports = passwordUtils;