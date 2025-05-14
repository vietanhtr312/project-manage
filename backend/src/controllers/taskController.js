const Task = require('../models/Task');
const User = require('../models/User');
const AppError = require('../errors/AppError');

exports.createTask = async (req, res, next) => {
    try {
        const { name, description, user_id, start_date, due_date, priority } = req.body;

        if (!name || name.length > 255) {
            return next(new AppError("Tên công việc không hợp lệ", 400));
        }
        if (!due_date || new Date(due_date) <= new Date(start_date)) {
            return next(new AppError("Deadline phải sau ngày bắt đầu", 400));
        }

        const userExists = await User.findById(user_id);
        if (!userExists) {
            return next(new AppError("User ID không tồn tại", 404));
        }

        const task = await Task.create({ 
            name, 
            description, 
            start_date, 
            due_date, 
            priority: priority || false 
        });

        res.status(201).json({ message: "OK", task_id: task._id });
    } catch (error) {
        next(error);
    }
};

exports.assignTask = async (req, res, next) => {
    try {
        const { task_id, user_id, start_date, end_date, priority_toggle } = req.body;

        const task = await Task.findById(task_id);
        const user = await User.findById(user_id);
        if (!task || !user) {
            return next(new AppError("Task ID hoặc User ID không tồn tại", 404));
        }
        if (new Date(end_date) <= new Date(start_date)) {
            return next(new AppError("Ngày kết thúc phải lớn hơn ngày bắt đầu", 400));
        }

        task.assigned_to = user_id;
        task.start_date = start_date;
        task.end_date = end_date;
        task.priority = priority_toggle === "on";
        await task.save();

        res.status(200).json({ message: "OK" });
    } catch (error) {
        next(error);
    }
};