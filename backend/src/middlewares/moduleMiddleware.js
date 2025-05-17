const ProjectMember = require('../models/ProjectMember');
const PermissionDeniedError = require('../errors/PermissionDeniedError');

exports.requireProjectLeader = async (req, res, next) => {
    const { projectId } = req.params;
    const userId = req.user.id;

    const member = await ProjectMember.findOne({ project: projectId, member: userId });
    if (!member || member.role !== 'leader') {
        throw new PermissionDeniedError("Only the project leader can manage modules");
    }
    next();
};