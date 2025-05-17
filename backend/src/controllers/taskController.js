const taskService = require('../services/taskService');
const taskMemberService = require('../services/taskMemberService');

exports.createTask = async (req, res, next) => {
    try {
        const { moduleId } = req.params;
        const { name, description, start_date, due_date, priority } = req.body;
        const task = await taskService.createTask(moduleId, name, description, start_date, due_date, priority);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

exports.getTasksByModule = async (req, res, next) => {
    try {
        const { moduleId } = req.params;
        const tasks = await taskService.getTasksByModule(moduleId);
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        next(error);
    }
};

exports.getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const task = await taskService.updateTask(id, updateData);
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        await taskService.deleteTask(id);
        res.status(200).json({ success: true, message: "Task deleted" });
    } catch (error) {
        next(error);
    }
};

// Quản lý thành viên trong nhiệm vụ
exports.assignTaskMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const taskMember = await taskMemberService.addTaskMember(id, email);
        res.status(201).json({ success: true, data: taskMember });
    } catch (error) {
        next(error);
    }
};

exports.getTaskMembers = async (req, res, next) => {
    try {
        const { id } = req.params;
        const members = await taskMemberService.getTaskMembers(id);
        res.status(200).json({ success: true, data: members });
    } catch (error) {
        next(error);
    }
};

exports.removeTaskMember = async (req, res, next) => {
    try {
        const { id, userId } = req.params;
        await taskMemberService.removeTaskMember(id, userId);
        res.status(200).json({ success: true, message: "Member removed from task" });
    } catch (error) {
        next(error);
    }
};