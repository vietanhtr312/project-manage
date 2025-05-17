const Task = require('../models/Task');
const PermissionDeniedError = require('../errors/PermissionDeniedError');
const ProjectMember = require('../models/ProjectMember');

exports.requireTaskMember = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findById(id).populate('module');
    if (!task) {
        throw new PermissionDeniedError("Task not found");
    }

    const projectId = task.module.parent;
    const member = await ProjectMember.findOne({ project: projectId, member: userId });
    if (!member) {
        throw new PermissionDeniedError("You must be a project member to access this task");
    }

    next();
};