const PermissionDeniedError = require('../errors/PermissionDeniedError');
const ProjectMember = require('../models/ProjectMember');

const taskMiddleware = {
    verifyTaskOwnership: async (req, res, next) => {
        try {
            const { user } = req;
            const { id } = req.params;
            const task = await Task.findById(id);
            if (!task) throw new ResourceNotFoundError("Task not found");

            const isOwner = task.user_id.equals(user.id);
            if (!isOwner) throw new PermissionDeniedError("Not authorized to modify this task");

            next();
        } catch (error) {
            next(error);
        }
    }
};

module.exports = taskMiddleware;
