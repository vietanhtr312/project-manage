const Task = require('../models/Task');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const taskService = {
    createTask: async ({ name, description, user_id, start_date, due_date, priority }) => {
        return await Task.create({ name, description, user_id, start_date, due_date, priority });
    },

    getTasks: async (projectId, page, limit) => {
        const skip = (page - 1) * limit;
        return await Task.find({ project: projectId }).skip(skip).limit(limit);
    },

    getTaskById: async (id) => {
        const task = await Task.findById(id);
        if (!task) throw new ResourceNotFoundError("Task not found");
        return task;
    },

    updateTask: async (id, updates) => {
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        if (!task) throw new ResourceNotFoundError("Task not found");
        return task;
    },

    deleteTask: async (id) => {
        const task = await Task.findByIdAndDelete(id);
        if (!task) throw new ResourceNotFoundError("Task not found");
        return task;
    },

    updateTaskStatus: async (id, status) => {
        const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
        if (!task) throw new ResourceNotFoundError("Task not found");
        return task;
    }
};

module.exports = taskService;
