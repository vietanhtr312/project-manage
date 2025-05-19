const Task = require('../models/Task');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const TaskMember = require('../models/TaskMember')
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
    },

    getTasksDueIn: async (days) => {
        const now = new Date();
        const due_date = new Date();
        due_date.setDate(now.getDate() + days);
        const tasks = await Task.find({
            due_date : due_date,
            status: {$ne: 'COMPLETED'}
        });
        if (!tasks) throw new ResourceNotFoundError("Task not found");
        return tasks;
    },

    getTaskMembers: async(taskId) => {
        const taskMembers = await TaskMember.find({task: taskId}).populate('member');
        return taskMembers;
    }
};

module.exports = taskService;
