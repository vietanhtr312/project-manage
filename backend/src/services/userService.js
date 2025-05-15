const express = require('express');
const User = require('../models/User');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');
const passwordUtils = require('../utils/passwordUtils');
const InvalidCredentialsError = require('../errors/InvalidCredentialsError');
const AppError = require('../errors/AppError'); // Assuming AppError is a custom error class

const userService = {
    getUserById: async (userId) => {
        try {
            const user = await User.findById(userId).select('-password_hash');
            if (!user) {
                throw new ResourceNotFoundError("User not found");
            }
            return user;
        } catch (error) {
            throw new AppError("Failed to fetch user by ID");
        }
    },

    updateProfile: async (userId, updateData) => {
        try {
            const { name, email } = updateData;
            if (email) {
                const existingEmail = await User.findOne({ email, _id: { $ne: userId } });
                if (existingEmail) {
                    throw new UserAlreadyExistsError('Email has been used');
                }
            }
            if (name) {
                const existingName = await User.findOne({ name, _id: { $ne: userId } });
                if (existingName) {
                    throw new UserAlreadyExistsError('Name has been used');
                }
            }
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: { name, email } },
                { new: true, runValidators: true }).select('-password_hash');
            if (!updatedUser) {
                throw new ResourceNotFoundError("User not found");
            }
            return updatedUser;
        } catch (error) {
            throw new AppError("Failed to update profile");
        }
    },

    changePassword: async (userId, currentPassword, newPassword) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new ResourceNotFoundError("User not found");
            }
            const isMatch = await passwordUtils.comparePassword(currentPassword, user.password_hash);
            if (!isMatch) {
                throw new InvalidCredentialsError("Incorrect password");
            }

            user.password_hash = await passwordUtils.hashPassword(newPassword);
            await user.save();
            return true;
        } catch (error) {
            throw new AppError("Failed to change password");
        }
    },

    deleteUser: async (userId, password) => {
        try {
            const user = await User.findById(userId);

            if (!user) {
                throw new ResourceNotFoundError('User not found');
            }

            const isMatch = await passwordUtils.comparePassword(password, user.password_hash);

            if (!isMatch) {
                throw new InvalidCredentialsError('Incorrect password');
            }
            await user.deleteOne();
            return true;
        } catch (error) {
            throw new AppError("Failed to delete user");
        }
    }
}

module.exports = userService;
