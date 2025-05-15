const AppError = require('../errors/AppError');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const Notification = require('../models/Notification'); // Import the Notification model

const notificationService = {
    getUserNotifications: async (userId) => {
        try {
            const notifications = await Notification.find({ user: userId}).sort({ createdAt: -1 });
            
            if (notifications.length === 0){
                throw new ResourceNotFoundError('You dont have notifications');
            }
            return notifications;
        } catch (error) {
            throw new AppError("Failed to fetch user notification");
        }
    },

    createNotification: async (userId, message, type, url = null) => {
        try {
            
            const notification = await Notification.create({
                user: userId,
                message,
                type,
                url,
            }); 
            return notification; 
        } catch (error) {
            throw new AppError("Failed to create")
        }
    },

    markAsRead: async (notificationId) => {
        try {
            return await Notification.findByIdAndUpdate(
                notificationId,
                { isRead: true },
                { new: true } 
            );
        } catch (error) {
            throw new AppError('Error marking notification as read');
        }
    },

    
    markAllAsRead: async (userId) => {
        try {
            return await Notification.updateMany(
                { user: userId, isRead: false },
                { isRead: true }
            );
        } catch (error) {
            throw new AppAError('Error marking all notifications as read');
        }
    }
};

module.exports = notificationService;