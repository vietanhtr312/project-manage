const userService = require("../services/userService");
const InvalidLengthError = require('../errors/InvalidLengthError');
const userController = {
    getMyProfile: async(req, res, next) => {
        try { 
            res.status(200)
                .json({
                    success: true, 
                    message: "Data fetched successfully",
                    data: {
                        _id: req.user.id, 
                        name: req.user.name, 
                        email: req.user.email, 
                    }
                })
        } catch (error) {
            next(error);
        }
    },

    updateMyProfile: async(req, res, next) => {
        try {
            const {name, email} = req.body;
            const userId = req.user.id;
            const updatedUser = await userService.updateProfile(userId, {name, email});
            res.status(200).json({
                success:true,
                message: "Update successfully",
                data: {
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                }
            })
        } catch (error) {
            next(error)
        }
    },
    changeMyPassword: async(req, res, next) => {
        try {
            const {currentPassword, newPassword} = req.body;
            userId = req.user.id;
            if (newPassword.length < 6) {
                throw new InvalidLengthError('New password must be at least 6 characters');
            }
            await userService.changePassword(userId, currentPassword, newPassword);

            res.status(200).json({
                success: true,
                message: 'Password updated successfully',
                data: null
            });
        } catch (error) {
            next(error)
        }
    },
    deleteMyAccount: async(req, res, next) => {
        try {
            const userId = req.user.id;
            const {password} = req.body
            await userService.deleteUser(userId, password);
            res.status(200).json({
                success: true, 
                message: "Account deleted successfully",
                data: null
            })
        } catch (error) {
            next(error);
        }
    },
    getProfile: async( req, res, next) => {
        try{
            const {id} = req.params;
            const user = await userService.getUserById(id);
            res.status(200).json({
                success: true, 
                message: "Data fetched successfully",
                data: {
                    _id: user.id,
                    name: user.name,
                    email: user.email
                }
            })
        } catch(error) {
            next(error)
        }
    }
};

module.exports = userController;