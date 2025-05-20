const Task = require('../models/Task');
const Module = require('../models/Module');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const TaskMember = require('../models/TaskMember');

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
        const taskmember = await TaskMember.findOne({ task: taskId })

        if (!task) {
            throw new ResourceNotFoundError("Task not found");
        }

        if (taskmember) {
            await taskmember.populate('member', 'name email');
        }

        return { ...task.toObject(), member: taskmember ? taskmember.member : null };
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
        await TaskMember.findOneAndDelete({ task: taskId });
    },

    getTasksByProjectId: async (projectId) => {
        const rootModules = await Module.find({ parent: projectId }).select('_id');
        if (!rootModules.length) return [];

        let allModuleIds = [];
        for (const mod of rootModules) {
            const ids = await getAllModuleIdsFromParent(mod._id.toString());
            allModuleIds = allModuleIds.concat(ids);
        }

        const tasks = await Task.find({ module: { $in: allModuleIds } });

        return tasks;
    },
    getTasksDueIn: async (days) => {
        const now = new Date();
        const due_date = new Date(now);
        due_date.setDate(now.getDate() + days);
        const tasks = await Task.find({
            due_date: {
                $get: now,
                $let: due_date
            },
            status: { $ne: 'done' }
        })
        if (!tasks || tasks.length == 0) throw new ResourceNotFoundError("You dont have a tasks");
        return tasks;
    },

    getTasksByUserAndProject: async (userId, projectId) => {
        const rootModules = await Module.find({ parent: projectId }).select('_id');
        if (!rootModules.length) return [];

        let allModuleIds = [];
        for (const mod of rootModules) {
            const ids = await getAllModuleIdsFromParent(mod._id.toString());
            allModuleIds = allModuleIds.concat(ids);
        }
        const taskMembers = await TaskMember.find({ member: userId })
            .populate({
                path: 'task',
                populate: {
                    path: 'module',
                    select: '_id parent',
                },
            });

        const tasks = taskMembers
            .map((tm) => tm.task)
            .filter((task) =>
                task &&
                task.module &&
                allModuleIds.includes(String(task.module._id))
            );

        return tasks;
    },

};

module.exports = taskService;