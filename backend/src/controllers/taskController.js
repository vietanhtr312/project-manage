const taskService = require('../services/taskService');
const taskMemberService = require('../services/taskMemberService');
const Task = require('../models/Task');

const taskController = {

    createTask: async (req, res, next) => {
        try {
            const { moduleId } = req.params;
            const { name, description, start_date, due_date } = req.body;
            const task = await taskService.createTask(moduleId, name, description, start_date, due_date);
            res.status(201).json({ success: true, data: task });
        } catch (error) {
            next(error);
        }
    },

    getTasksByModule: async (req, res, next) => {
        try {
            const { moduleId } = req.params;
            const tasks = await taskService.getTasksByModule(moduleId);
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            next(error);
        }
    },

    getTaskById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const task = await taskService.getTaskById(id);
            res.status(200).json({ success: true, data: task });
        } catch (error) {
            next(error);
        }
    },

    updateTask: async (req, res, next) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const task = await taskService.updateTask(id, updateData);
            res.status(200).json({ success: true, data: task });
        } catch (error) {
            next(error);
        }
    },

    deleteTask: async (req, res, next) => {
        try {
            const { id } = req.params;
            await taskService.deleteTask(id);
            res.status(200).json({ success: true, message: "Task deleted" });
        } catch (error) {
            next(error);
        }
    },

    getTasksByProjectId: async (req, res, next) => {
        try {
            const { projectId } = req.params;
            const tasks = await taskService.getTasksByProjectId(projectId);

            res.status(200).json({
                success: true,
                message: "Tasks by project fetched",
                data: tasks,
            });
        } catch (error) {
            next(error);
        }
    },

    getTaskDetails: async (req, res) => {
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
    },

    
}

module.exports = taskController;

