const Task = require('../models/Task');
const User = require('../models/User');
const AppError = require('../errors/AppError');
const taskService = require('../services/taskService');

exports.createTask = async (req, res, next) => {
    try {
        const { name, description, user_id, start_date, due_date, priority } = req.body;

        if (!name || name.length > 255) {
            return next(new AppError("Tên công việc không hợp lệ", 400));
        }
        if (!due_date || new Date(due_date) <= new Date(start_date)) {
            return next(new AppError("Deadline phải sau ngày bắt đầu", 400));
        }

        const task = await taskService.createTask({ name, description, user_id, start_date, due_date, priority });
        res.status(201).json({ message: "OK", task_id: task._id });
    } catch (error) {
        next(error);
    }
};

exports.getTasks = async (req, res, next) => {
    try {
        const { projectId, page = 1, limit = 10 } = req.query;
        const tasks = await taskService.getTasks(projectId, page, limit);
        res.status(200).json({ message: "OK", data: tasks });
    } catch (error) {
        next(error);
    }
};

exports.getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);
        res.status(200).json({ message: "OK", data: task });
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const task = await taskService.updateTask(id, updates);
        res.status(200).json({ message: "Updated", data: task });
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        await taskService.deleteTask(id);
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        next(error);
    }
};

exports.updateTaskStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const task = await taskService.updateTaskStatus(id, status);
        res.status(200).json({ message: "Status updated", data: task });
    } catch (error) {
        next(error);
    }
};

exports.getTaskDetails = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
        return res.status(404).json({ error: 'Không tìm thấy task' });
        }

        res.json({
        id: task._id,
        name: task.name,
        description: task.description,
        start_date: task.start_date,
        due_date: task.due_date,
        status: task.status
        });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi server' });
    }
};
