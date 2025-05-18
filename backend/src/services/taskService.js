const Task = require('../models/Task');
const Module = require('../models/Module');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const getAllModuleIdsFromParent = async (parentId) => {
    const allIds = [];
    const queue = [parentId];


    while (queue.length > 0) {
        const current = queue.shift();
        allIds.push(current);

        const children = await Module.find({ parent: current }).select('_id');
        for (const child of children) {
            queue.push(child._id.toString());
        }
    }
    console.log(allIds);


    return allIds;
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
        // Tìm các module gốc của project
        const rootModules = await Module.find({ parent: projectId }).select('_id');
        if (!rootModules.length) return [];

        let allModuleIds = [];
        for (const mod of rootModules) {
            const ids = await getAllModuleIdsFromParent(mod._id.toString());
            allModuleIds = allModuleIds.concat(ids);
        }

        // Truy vấn tất cả task theo moduleIds
        const tasks = await Task.find({ module: { $in: allModuleIds } });

        return tasks;
    }
};

module.exports = taskService;