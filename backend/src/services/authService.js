const User = require('../models/User');
const jwtUtils = require('../utils/jwtUtils')
const passwordUtils = require('../utils/passwordUtils');
const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');
const InvalidCredentialsError = require('../errors/InvalidCredentialsError');

const authService = {
    /**
     * Register a new user
     * @param {string} name - User's name
     * @param {string} email - User's email
     * @param {string} password -User's password
     * @returns {Object} User data and token
     */
    registerUser: async (name, email, password) => {
        try {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                throw new UserAlreadyExistsError('This email has been used');
            }
            const existingName = await User.findOne({ name });
            if (existingName) {
                throw new UserAlreadyExistsError('This name has been used')
            }
            const password_hash = await passwordUtils.hashPassword(password);

            const newUser = new User({
                name,
                email,
                password_hash
            });
            const savedUser = await newUser.save();

            const token = jwtUtils.generateToken(savedUser.id);

            return {
                token,
                user: {
                    id: savedUser.id,
                    name: savedUser.name,
                    email: savedUser.email
                }
            }
        } catch (error) {
            throw new AppError("Failed to register");
        }

    },
    loginUser: async (email, password) => {
        try {
            const user = await User.findOne({ email });
            if (!user)
                throw new InvalidCredentialsError("Email does not exist")

            const isValidPassword = await passwordUtils.comparePassword(password, user.password_hash);
            if (!isValidPassword)
                throw new InvalidCredentialsError("Incorrect password")

            const token = jwtUtils.generateToken(user.id);

            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        } catch (error) {
            throw new AppError("Failed to login")
        }
    }
};

module.exports = authService;
