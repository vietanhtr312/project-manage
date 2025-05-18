const Task = require('../models/Task');
const PermissionDeniedError = require('../errors/PermissionDeniedError');

exports.requireTaskOwner = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findById(id);
    if (!task) {
        throw new PermissionDeniedError("Task not found");
    }

    if (task.createdBy.toString() !== userId) {
        throw new PermissionDeniedError("Only the task owner can modify this task");
    }

    next();
};