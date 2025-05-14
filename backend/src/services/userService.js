const express = require('express')
const User = require('../models/User');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');
const passwordUtils = require('../utils/passwordUtils');
const InvalidCredentialsError = require('../errors/InvalidCredentialsError');

const userService = {
    getUserById: async(userId) => {
        const user = await User.findById(userId).select('-password_hash');
        if (!user) {
            throw new ResourceNotFoundError("User not found");
        }
        return user
    },
    updateProfile: async(userId, updateData) => {
        const {name, email} = updateData;
        if (email) {
            const existingEmail = await User.findOne({email, _id:{ $ne: userId }})
            if (existingEmail) {
                throw new UserAlreadyExistsError('Email has been used');
            }
        }
        if (name) {
            const existingName = await User.findOne({name, _id:{ $ne: userId }})
            if (existingName) {
                throw new UserAlreadyExistsError('Name has been used');
            }
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {$set: {name, email}},
            {new: true, runValidators: true}).select('-password_hash');
        if (!updatedUser) {
            throw new ResourceNotFoundError("User not found");
        }
        return updatedUser;
    },
    changePassword: async(userId, currentPassword, newPassword) => {
        const user = await User.findById(userId);
        if (!user) {
            throw new ResourceNotFoundError("User not found");
        }
        console.log(user.password_hash, "here ")
        const isMatch = await passwordUtils.comparePassword(currentPassword, user.password_hash);
        if (!isMatch) {
            throw new InvalidCredentialsError("Incorrect password")
        }
        
        user.password_hash = await passwordUtils.hashPassword(newPassword);
        await user.save();
        return true;
    },
    deleteUser: async(userId, password) => {
        const user = await User.findById(userId);
        
        if (!user) {
            throw new ResourceNotFoundError('User not found');
        }

        const isMatch = await passwordUtils.comparePassword(password, user.password_hash);
        
        if (!isMatch) {
            throw new InvalidCredentialsError('Incorrect password');
        }
        user.deleteOne();
        return true;
    }
}

module.exports = userService;