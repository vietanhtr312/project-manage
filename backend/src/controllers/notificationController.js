
const notificationService = require('../services/notificationService');
const PermissionDeniedError = require('../errors/PermissionDeniedError')
const notificationController = {
    getUserNotifications: async (req, res, next) => {
        try {
            const userId = req.user._id; 
            const notifications = await notificationService.getUserNotifications(userId);
            res.status(200).json({
                success: true,
                message: "Notifications fetched successfully",
                data: notifications
            });
        } catch (error) {
            next(error);
        }
    },

    createNotification: async (req, res, next) => {
        try {
            const { userId, message, type, url } = req.body;
            if (userId == req.user._id) {
                throw new PermissionDeniedError("You cant create noti for yourself");
            }
            
            const newNotification = await notificationService.createNotification(userId, message, type, url);
            res.status(201).json({
                success: true, 
                message: "Notification created",
                data: newNotification
            });
        } catch (error) {
            next(error);
        }
    },

    markAsRead: async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedNotification = await notificationService.markAsRead(id);
            res.status(200).json({
                success: true, 
                message: "Marked",
                data: updatedNotification
            });
        } catch (error) {
            next(error);
        }
    },

    markAllAsRead: async (req, res, next) => {
        try {
            const userId = req.user._id; 
            await notificationService.markAllAsRead(userId);
            res.status(200).json({
                success: true, 
                message: "Marked all",
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = notificationController;
