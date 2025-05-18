const Task = require('../models/Task');
const Module = require('../models/Module');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const getAllModulesByParent = async (parentId) => {
    const result = [];
    const queue = [parentId];

    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);

        const children = await Module.find({ parent: current }).select('_id');
        for (const child of children) {
            queue.push(child._id.toString());
        }
    }

    return result;
};

const taskService = {
    createTask: async (moduleId, name, description, start_date, due_date) => {
        const module = await Module.findById(moduleId);
        if (!module) {
            throw new ResourceNotFoundError("Module not found");
        }

        return await Task.create({
            module: moduleId,
            name,
            description,
            start_date,
            due_date,
            status: 'to-do',
        });
    },

    getTasksByModule: async (moduleId) => {
        return await Task.find({ module: moduleId });
    },

    getTaskById: async (taskId) => {
        const task = await Task.findById(taskId).populate('module');
        if (!task) {
            throw new ResourceNotFoundError("Task not found");
        }
        return task;
    },

    updateTask: async (taskId, updateData) => {
        const task = await Task.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!task) {
            throw new ResourceNotFoundError("Task not found");
        }

        return task;
    },

    deleteTask: async (taskId) => {
        await Task.findByIdAndDelete(taskId);
    },

    getTasksByProjectId: async (projectId) => {
        const moduleIds = await getAllModulesByParent(projectId);

        const tasks = await Task.find({ module: { $in: moduleIds } });

        return tasks;
    }
};

module.exports = taskService;