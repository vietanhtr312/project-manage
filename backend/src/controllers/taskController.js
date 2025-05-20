const taskService = require('../services/taskService');
const taskMemberService = require('../services/taskMemberService');
const Task = require('../models/Task');
const ProjectMember = require('../models/ProjectMember');
const Module = require('../models/Module')
const TaskMember = require('../models/TaskMember')
const getRootProjectId = async (moduleId) => {
    let current = await Module.findById(moduleId);
    while (current && current.parent) {
        const parentModule = await Module.findById(current.parent);
        if (!parentModule) break;
        current = parentModule;
    }
    return current.parent;
};

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
            const userId = req.user.id;

            const task = await taskService.getTaskById(id);
            if (!task) throw new Error("Task not found");

            const moduleId = typeof task.module === "object" ? task.module._id : task.module;
            const projectId = await getRootProjectId(moduleId);

            const projectMember = await ProjectMember.findOne({
                project: projectId,
                member: userId,
            });

            if (!projectMember) {
                return res.status(403).json({
                    success: false,
                    message: "You are not part of this project.",
                });
            }

            const isMember = projectMember.role === "member";

            if (isMember) {
                const nonAllowedKeys = Object.keys(updateData).filter((k) => k !== "progress");
                if (nonAllowedKeys.length > 0) {
                    return res.status(403).json({
                        success: false,
                        message: "Member chỉ được cập nhật progress.",
                    });
                }
            }

            const updatedTask = await taskService.updateTask(id, updateData);
            return res.status(200).json({ success: true, data: updatedTask });
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

    getTasksByUserAndProject: async (req, res, next) => {
        try {
            const { userId, projectId } = req.params;
            const tasks = await taskService.getTasksByUserAndProject(userId, projectId);
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = taskController;

